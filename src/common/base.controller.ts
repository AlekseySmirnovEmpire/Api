import { Router, Response } from "express";
import { injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { IControllerRoute } from "./routes.interface";
export { Router } from 'express';
import 'reflect-metadata';

@injectable()
export abstract class BaseController {
    private readonly _router: Router;

    constructor(
        private logger: ILogger
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