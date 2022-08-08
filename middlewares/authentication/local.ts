import { NextFunction, Request, Response } from 'express'

import passport from '../../authentication/strategies'

import { Unauthorized } from '../../errors/HttpErrors'

export function callback(
	req: Request,
	next: NextFunction,
	error: any,
	user?: any,
	options?: any
) {
	if (error) {
		return next(error)
	}

	if (options?.message === 'Missing credentials') {
		throw new Unauthorized('The user credentials are missing.')
	}

	const request = req as any
	request.account = user
	return next()
}

export function handler(req: Request, res: Response, next: NextFunction) {
	passport.authenticate('local', { session: false }, (error, user, options) =>
		callback(req, next, error, user, options)
	)(req, res, next)
}

const local = { callback, handler }

export default local
