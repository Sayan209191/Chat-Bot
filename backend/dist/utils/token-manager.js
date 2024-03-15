import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payLoad = { id, email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { expiresIn: expiresIn.toString() });
    return token;
};
//# sourceMappingURL=token-manager.js.map