import express, { Application } from "express";
import { AuthController } from "./controllers/AuthController";
import { MockAuthRepoSingleton } from "./data/MockAuthRepo";
import { authMiddleware } from "./middleware/auth.middleware";
import { AuthService } from "./services/AuthService";

export class AppConfig {
    protected readonly PORT = process.env.PORT || 5000;

    constructor(private readonly ExpressRef: typeof express) {}
    public async run() {
        try {
            this.setupApp();
        } catch (e) {
            console.error(e);
        }
    }

    protected configureRoutes(app: Application): void {
        const authController = new AuthController(
            this.ExpressRef.Router(),
            // TODO pass parameterized repository to dynamically fetch repo.
            new AuthService(MockAuthRepoSingleton),
            authMiddleware
        );

        app.use("/login", authController.router);
    }

    protected setupApp() {
        const app: Application = this.ExpressRef();

        app.use(function (req, res, next) {
            res.header({
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Method": "POST, GET, OPTIONS",
                "Access-Control-Allow-Max-Age": "86400",
                "Access-Control-Allow-Credentials": "true",
                Vary: "Origin",
            });

            next();
        });
        app.use(express.json());

        app.disable("x-powered-by");

        this.configureRoutes(app);

        app.listen(this.PORT, () => {
            console.log("Server is connected on: ", this.PORT);
        });
    }
}
