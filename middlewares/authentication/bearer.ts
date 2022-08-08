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

	if (!user) {
		throw new Unauthorized('The access token is missing.')
	}

	const request = req as any
	const { token, account } = user
	request.token = token
	request.account = account
	return next()
}

export function handler(req: Request, res: Response, next: NextFunction) {
	passport.authenticate('bearer', { session: false }, (error, user, options) =>
		callback(req, next, error, user, options)
	)(req, res, next)
}

const bearer = { callback, handler }

export default bearer
