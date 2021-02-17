import { Handler, Router } from "express";
import { CountryService } from "../services/CountryService";
import { AbstractController } from "./AbstractController";

export class CountryController extends AbstractController<CountryService> {
    constructor(
        public readonly router: Router,
        service: CountryService,
        protected readonly authMiddleware: Handler
    ) {
        super(service);
        this.init(router);
    }

    protected init(router: Router): void {
        this.getCountriesByName(router);
    }

    protected getCountriesByName(router: Router): void {
        router.get("/", this.service.getCountriesByName);
    }
}
