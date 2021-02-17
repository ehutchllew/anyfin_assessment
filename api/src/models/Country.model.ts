import { AbstractModel } from "./Abstract.model";

export class CountryModel extends AbstractModel {
    public fullName: string;
    public population: string;
    public currencies: string[];
}
