import { UserModel } from "../models/User.model";
import { IAuthRepo } from "./IAuthRepo";

class MockAuthRepo implements IAuthRepo {
    private _user: UserModel = new UserModel();
    constructor() {
        this._user.dateCreated = new Date();
        this._user.dateUpdated = new Date();
        this._user.username = "HireEvan";
        this._user.password = "Test123!";
    }
    public async findUser(query): Promise<UserModel | null> {
        if (query.token && query.username) {
            if (query.token === this._user.token) {
                return this._user;
            } else {
                return null;
            }
        }
        if (query.username === this._user.username) {
            return this._user;
        } else {
            return null;
        }
    }

    public async saveUser(query): Promise<void> {
        this._user = query;
    }
}

export const MockAuthRepoSingleton = new MockAuthRepo();
