import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware
export const validateSignUpRequest = [
    body('name').notEmpty().withMessage('Name is required!'),
    body('email')
        .notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Please enter a valid email address!'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!')
        .matches(/\d/).withMessage('Password must contain at least one number!')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character!'),


    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err: any = new Error("Validation Failed!");
            err.status = 400;
            err.errors = errors.array();
            return next(err);
        }
        next();
    }
];

export const validateVerifyOtpRequest = [
    body('adminId').notEmpty().withMessage('Admin Id is required!'),
    body('otp').notEmpty().withMessage('Otp is required!'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err: any = new Error("Validation Failed!");
            err.status = 400;
            err.errors = errors.array();
            return next(err);
        }
        next();
    }
];

export const validateSignInRequest = [
    body('email')
        .notEmpty().withMessage('Email is required!')
        .isEmail().withMessage('Please enter a valid email address!'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long!')
        .matches(/\d/).withMessage('Password must contain at least one number!')
        .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character!'),

    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const err: any = new Error("Validation Failed!");
            err.status = 400;
            err.errors = errors.array();
            return next(err);
        }
        next();
    }
];