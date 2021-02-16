import { UserModel } from "../models/User.model";

export interface IAuthRepo {
    findUser: (query: any) => Promise<UserModel | null>;
}
