import { CountryModel, ICountryCurrencies } from "../models/Country.model";
import { ICountryRepo } from "./ICountryRepo";
import fetch from "node-fetch";

export class CountryRepoImpl implements ICountryRepo {
    public async getCountriesByName(query: string): Promise<CountryModel[]> {
        const url: string = `https://restcountries.eu/rest/v2/name/${query}`;
        const restCountriesResp = await fetch(url);
        const json = await restCountriesResp.json();
        const countryList: CountryModel[] = [];

        for (let i = 0; i < json.length; i++) {
            const country = json[i];
            const countryModel = new CountryModel();

            countryModel.fullName = country.name;
            countryModel.population = country.population;
            countryModel.currencies = [];

            for (let j = 0; j < country.currencies.length; j++) {
                const currency = country.currencies[j];
                const fixerResp = await fetch(
                    `http://data.fixer.io/api/latest?access_key=19ac58cdbee9dc060752fe0960e25739&symbols=${country.currencies[j].code} ,SEK&format=1`
                );
                const fixerJson = await fixerResp.json();
                if (currency.name && fixerJson.rates[currency.code]) {
                    const countryCurrency: ICountryCurrencies = {
                        code: currency.code,
                        name: currency.name,
                        symbol: currency.symbol,
                        exchangeCode: "SEK",
                        exchangeRate:
                            fixerJson.rates["SEK"] /
                            fixerJson.rates[currency.code],
                    };

                    countryModel.currencies.push(countryCurrency);
                }
            }
            countryList.push(countryModel);
        }

        return countryList;
    }
}
