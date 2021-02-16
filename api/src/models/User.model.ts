import { AbstractModel } from "./Abstract.model";

export class UserModel extends AbstractModel {
    public password: string;
    public username: string;
    public token?: string;
}
