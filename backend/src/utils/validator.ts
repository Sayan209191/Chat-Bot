import { body , ValidationChain, validationResult  } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validate = (validations : ValidationChain[]) => {
    return async (req:Request, res : Response, next : NextFunction) => {
        // Array to collect validation errors
        const validationErrors = [];

        // Running all validations
        for(let validation of validations) {
            const result = await validation.run(req);
            if(!result.isEmpty()) {
                validationErrors.push(...result.array()); // Collecting validation errors
            }
        }

        // If there are validation errors, return them
        if(validationErrors.length > 0) {
            return res.status(422).json({ errors: validationErrors });
        }

        // If no validation errors, proceed to the next middleware
        return next();
    };
};

export const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
       .trim()
       .isLength({min:6})
       .withMessage("Password should contains atleast 6 character"),
];

export const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
];

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("Message is required"),
];

