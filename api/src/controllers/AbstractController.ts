import { Router } from "express";
import { AbstractService } from "../services/AbstractService";

export abstract class AbstractController<T extends AbstractService<any>> {
    constructor(protected readonly service: T) {}

    protected abstract init(router: Router): void;
}
