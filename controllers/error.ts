import { NextFunction, Request, Response } from 'express'
import { MethodNotAllowed } from '../errors/HttpErrors'

export const NotAllowed =
	(reason: string, allow: string) =>
	(req: Request, res: Response, next: NextFunction) => {
		throw new MethodNotAllowed(reason, allow)
	}
