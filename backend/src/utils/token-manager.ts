import { Request , Response , NextFunction } from "express";
import { param } from "express-validator";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";
import { resolve } from "path";
import { rejects } from "assert";
import { error } from "console";

export const createToken = (id:string, email : string, expiresIn : string) => {
    const payLoad = { id, email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, { 
        expiresIn}
    );
    return token;
}

export const verifyToken = async (req:Request , res: Response, next : NextFunction) => {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    // console.log(token);
    if(!token || token.trim() === "") {
        return res.status(401).json({messege : "Token not Received"});
    }
    return new Promise<void> ((resolve , reject) => {
        return jwt.verify(token , process.env.JWT_SECRET, (err, success) => {
            if(err) {
                reject(err.message);
                return res.status(401).json({message : "Token Expired"})
            } else {
                console.log("Token verification Successful");
                resolve();
                res.locals.jwtData = success;
                return next();
                
            }
        });
    })
}