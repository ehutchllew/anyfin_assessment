import { Express } from "express-serve-static-core";
import { UserModel } from "../../src/models/User.model";

declare module "express-serve-static-core" {
    interface Request {
        file?: { buffer: Buffer };
        token?: string;
        user?: UserModel;
    }
}
