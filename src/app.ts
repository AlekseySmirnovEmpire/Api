import express, { Express } from 'express';
import { Server } from 'node:http';
import { ExceptionFilter } from './errors/exception.filters';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: LoggerService;
    userController: UserController;
    exeptionFilter: ExceptionFilter;

    constructor(logger: LoggerService, userController: UserController, exeptionFilter: ExceptionFilter) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exeptionFilter = exeptionFilter;
    }

    useRoutes() {
        this.app.use('/users', this.userController.router);
    }

    useExceptionFilters() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
    }
}