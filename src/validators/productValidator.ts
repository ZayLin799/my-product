import { body, query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation middleware
export const validateProductRequest = [
    body('name').notEmpty().withMessage('Name is required!'),
    body('price')
        .notEmpty().withMessage('Price is required!')
        .custom(value => {
            if (parseFloat(value) <= 0) {
                throw new Error('Price must be a positive number!');
            }
            return true;
        })
        .isInt({ gt: 0 }).withMessage('Price must be an integer!').toInt(),


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

export const validateProductPagination = [
    query("page", "Page number must be integer!").isInt({ gt: 0 }).toInt(),
    query("limit", "Limit number must be integer!").isInt({ gt: 0 }).toInt(),

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
