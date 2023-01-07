import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../logger/logger.service";
import { IExeptionFilter } from "./exeption.filter.interface";
import { HTTPError } from "./http-error.class";


export class ExceptionFilter implements IExeptionFilter {
    logger: LoggerService;

    constructor(logger: LoggerService) {
        this.logger = logger;
    }

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