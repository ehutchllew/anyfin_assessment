import { Handler, Router } from "express";
import { AuthService } from "../services/AuthService";
import { AbstractController } from "./AbstractController";

export class AuthController extends AbstractController<AuthService> {
    constructor(
        public readonly router: Router,
        service: AuthService,
        protected readonly authMiddleware: Handler
    ) {
        super(service);
        this.init(router);
    }

    protected init(router: Router): void {
        this.login(router);
        this.secretPath(router);
    }

    protected login(router: Router): void {
        router.post("/", this.service.loginUser);
    }

    protected secretPath(router: Router): void {
        router.get("/secret", this.authMiddleware, this.service.secret);
    }
}
