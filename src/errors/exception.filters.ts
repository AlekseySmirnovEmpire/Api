import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";
import 'reflect-metadata';

@injectable()
export class ExceptionFilter implements IExeptionFilter {
    constructor(@inject(TYPES.ILogger) private logger: ILogger) { }

    catch(ex: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
        if (ex instanceof HTTPError) {
            this.logger.error(`${ex.context} Ошибка ${ex.statusCode} : ${ex.message}`);
            res.status(ex.statusCode).send({
                error: ex.message
            });
            return;
        }

        this.logger.error(`${ex.message}`);
        res.status(500).send({
            error: ex.message
        });
    }
}