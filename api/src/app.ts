import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { AuthController } from "./controllers/AuthController";
import { MockAuthRepoSingleton } from "./data/MockAuthRepo";
import { authMiddleware } from "./middleware/auth.middleware";
import { AuthService } from "./services/AuthService";
import { CountryController } from "./controllers/CountryController";
import { CountryService } from "./services/CountryService";
import { CountryRepoImpl } from "./data/CountryRepoImpl";
import rateLimit from "express-rate-limit";

export class AppConfig {
    protected readonly PORT = process.env.PORT || 3001;

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

        const countryController = new CountryController(
            this.ExpressRef.Router(),
            new CountryService(new CountryRepoImpl()),
            authMiddleware
        );

        app.use("/login", authController.router);
        app.use("/country", countryController.router);
    }

    protected setupApp() {
        const app: Application = this.ExpressRef();

        app.use(function (req, res, next) {
            res.header({
                "Access-Control-Allow-Origin": "http://localhost:3000",
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                "Access-Control-Allow-Method": "POST, GET, OPTIONS",
                "Access-Control-Allow-Max-Age": "86400",
                "Access-Control-Allow-Credentials": "true",
                Vary: "Origin",
            });

            next();
        });
        app.use(express.json());
        app.use(cookieParser());
        app.use(
            rateLimit({
                windowMs: 60 * 1000,
                max: 30,
            })
        );
        app.disable("x-powered-by");

        this.configureRoutes(app);

        app.listen(this.PORT, () => {
            console.log("Server is connected on: ", this.PORT);
        });
    }
}
