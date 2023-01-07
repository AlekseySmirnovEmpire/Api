import express, { Express } from 'express';
import { inject, injectable } from 'inversify';
import { Server } from 'node:http';
import { ExceptionFilter } from './errors/exception.filters';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import 'reflect-metadata';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExceptionFilter,
	) {
		this.app = express();
		this.port = 8000;
	}

	useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	useExceptionFilters(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}
