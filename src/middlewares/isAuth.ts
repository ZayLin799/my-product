import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    adminId?: number;
}

const isAuth = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        const err: any = new Error("No token provided!");
        err.status = 401;
        return next(err);
    }

    const token = authHeader && authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
            id: number;
        };
    } catch (error: any) {
        const err: any = new Error("Something Wrong In Authentication!");
        err.status = 500;
        console.error(error);
        return next(err);
    }

    if (!decodedToken) {
        const err: any = new Error("Unauthorized!");
        err.status = 401;
        return next(err);
    }
    req.adminId = decodedToken.id;
    next();
};

export default isAuth;
