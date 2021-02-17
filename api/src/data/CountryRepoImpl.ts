import { CountryModel } from "../models/Country.model";
import { ICountryRepo } from "./ICountryRepo";

export class CountryRepoImpl implements ICountryRepo {
    public async getCountriesByName(query: string): Promise<CountryModel[]> {}
}
