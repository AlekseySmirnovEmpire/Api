import { NextFunction, Request, Response } from 'express';

export interface IExeptionFilter {
	catch(ex: Error, req: Request, res: Response, next: NextFunction): void;
}
