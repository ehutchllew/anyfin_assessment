import { CountryModel } from "../models/Country.model";

export interface ICountryRepo {
    getCountriesByName: (query: string) => Promise<CountryModel[] | null>;
}
