import { AbstractModel } from "./Abstract.model";

export interface ICountryCurrencies {
    code: string;
    name: string;
    symbol: string;
    exchangeCode: string;
    exchangeRate: number;
}

export class CountryModel extends AbstractModel {
    public fullName: string;
    public population: string;
    public currencies: ICountryCurrencies[];
}
