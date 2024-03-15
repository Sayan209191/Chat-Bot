import User from "../models/User.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        // get all user from the database
        const users = await User.find();
        return res.status(201).json({ message: "Ok", users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error Occurs", cause: error.message });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        // User sign up
        const { name, email, password } = req.body;
        const userExist = User.findOne(email);
        if (userExist) {
            return res.status(401).send("Email is already registered !!");
        }
        const hashPassword = await hash(password, 10); // string , round
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        // create token and store cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            domain: "localhost",
            path: "/",
        }); // when user agin  sign in , then the preveious cookie will be removed
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        }); // for local browser
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Error Occurs", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    try {
        // User Sign In
        const { email, password } = req.body;
        // check email is regisotered or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).send("User not registered !! \n Please Register and Try again !!");
        }
        // check password
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) {
            return res.status(403).send("Invalid Password !!");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            signed: true,
            domain: "localhost",
            path: "/",
        }); // when user agin  sign in , then the preveious cookie will be removed
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true
        }); // for local browser
        return res.status(201).json({ message: "Ok", id: user._id.toString() });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "Error Occurs", cause: error.message });
    }
};
//# sourceMappingURL=user-controllers.js.map