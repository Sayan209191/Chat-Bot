import jwt from "jsonwebtoken";

export const createToken = (id:string, email : string, expiresIn) => {
    const payLoad = { id, email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: expiresIn.toString() } );
    return token;
}