import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { MockAuthRepoSingleton } from "../data/MockAuthRepo";
import { errorHandler, IError, SERVICE_ERRORS } from "../util/errorHandler";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw { name: SERVICE_ERRORS.INVALID_TOKEN };
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await MockAuthRepoSingleton.findUser({
            username: decoded.username,
            token,
        });

        if (!user) {
            throw { name: SERVICE_ERRORS.DOCUMENT_NOT_FOUND };
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        const err: IError = errorHandler(e);
        res.status(err.status).send(err);
    }
};

export { authMiddleware };
