import { Request, Response } from "express";
import { ICountryRepo } from "../data/ICountryRepo";
import { CountryModel } from "../models/Country.model";
import { errorHandler, IError, SERVICE_ERRORS } from "../util/errorHandler";
import { AbstractService } from "./AbstractService";

export class CountryService extends AbstractService<ICountryRepo> {
    constructor(repository: ICountryRepo) {
        super(repository);
        this.getCountriesByName = this.getCountriesByName.bind(this);
    }

    public async getCountriesByName(
        req: Request<any, any, CountryModel>,
        res: Response<CountryModel[] | IError>
    ) {
        try {
        } catch (e) {
            errorHandler(e, res);
        }
    }
}
