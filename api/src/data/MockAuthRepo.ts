import { UserModel } from "../models/User.model";
import { IAuthRepo } from "./IAuthRepo";

export class MockAuthRepo implements IAuthRepo {
    public async findUser(query): Promise<UserModel | null> {
        if (query.username === "HireEvan") {
            const user = new UserModel();
            user.dateCreated = new Date();
            user.dateUpdated = new Date();
            user.username = query.username;
            user.password = "Test123!";

            return user as UserModel;
        } else {
            return null;
        }
    }
}
