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
            const parsedFilter = JSON.parse(
                Buffer.from(req.query["filter"] as string, "base64").toString()
            );
            if (!parsedFilter) {
                throw { name: SERVICE_ERRORS.MALFORMED };
            }
            res.send(
                await this.repository.getCountriesByName(parsedFilter["name"])
            );
        } catch (e) {
            errorHandler(e, res);
        }
    }
}
