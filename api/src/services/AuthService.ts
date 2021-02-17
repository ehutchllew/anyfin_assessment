import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthRepo } from "../data/IAuthRepo";
import { UserModel } from "../models/User.model";
import { errorHandler, IError, SERVICE_ERRORS } from "../util/errorHandler";
import { AbstractService } from "./AbstractService";

export class AuthService extends AbstractService<IAuthRepo> {
    constructor(repository: IAuthRepo) {
        super(repository);
        this.loginUser = this.loginUser.bind(this);
        this.secret = this.secret.bind(this);
    }

    public async loginUser(
        req: Request<any, any, Pick<UserModel, "password" | "username">>,
        res: Response<
            (Omit<UserModel, "password"> & { token?: string }) | IError
        >
    ) {
        try {
            const reqCookieToken = req.cookies["token"];
            if (reqCookieToken) {
                const token = jwt.verify(
                    req.cookies["token"],
                    process.env.JWT_SECRET_KEY
                );
                const user = await this.repository.findUser({
                    username: token.username,
                });

                res.send(this.to_json(user, ["password"]));
                return;
            }
            const { password, username } = req.body;
            console.log(password, username);
            if (!password || !username) {
                throw { name: SERVICE_ERRORS.MALFORMED };
            }

            const user = await this.repository.findUser({ username });
            console.log("USER: ", user);
            if (!user) {
                throw {
                    message: "Unable to Login",
                    name: SERVICE_ERRORS.FAILED_LOGIN,
                };
            }
            const isMatch = password === user.password;
            console.log(isMatch, password, user.password);
            if (!isMatch) {
                throw {
                    message: "Unable to Login",
                    name: SERVICE_ERRORS.FAILED_LOGIN,
                };
            }

            const token = jwt.sign(
                { username: user.username },
                process.env.JWT_SECRET_KEY
            );
            const tokenizedUser = { ...user, token };
            this.repository.saveUser(tokenizedUser);

            res.cookie("token", token);
            res.send(this.to_json(tokenizedUser, ["password"]));
        } catch (e) {
            errorHandler(e, res);
        }
    }

    public secret(req: Request, res: Response) {
        try {
            console.log("got to secret");
            res.send("This is a private club.");
        } catch (e) {
            errorHandler(e, res);
        }
    }
}
