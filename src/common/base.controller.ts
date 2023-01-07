import { Router, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IControllerRoute } from "./routes.interface";
export { Router } from 'express';

export abstract class BaseController {
    private readonly _router: Router;

    constructor(
        private logger: LoggerService
    ) {
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    public send<T>(res: Response, code: number, data: T) {
        res.type('application/json');
        return res.status(code).json(data);
    }

    public ok<T>(res: Response, data: T) {
        return this.send<T>(res, 200, data);
    }

    public created(res: Response) {
        return res.sendStatus(201);
    }

    protected bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            this.logger.log(`[${route.method}] ${route.path}`);
            const handler = route.func.bind(this);
            this._router[route.method](route.path, handler);
        }
    }
}