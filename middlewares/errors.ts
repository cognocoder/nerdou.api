import { Express, Request, Response, NextFunction } from 'express'

const jwt = require('jsonwebtoken')

import { HttpError, MethodNotAllowed } from '../errors/HttpErrors'

export const handler = (
	error: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let status = 500

	if (error instanceof HttpError) {
		status = error.code
	}

	if (error instanceof MethodNotAllowed) {
		res.set('Allow', error.allow)
	}

	if (
		error instanceof jwt.JsonWebTokenError ||
		error instanceof jwt.TokenExpiredError
	) {
		status = 401
	}

	return res.status(status).json(error)
}

export const errors = (app: Express) => {
	app.use(handler)
	return app
}

export default errors
