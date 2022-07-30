import { NextFunction, Request, Response } from 'express'

import passport from '../authentication/strategies'

import { BadRequest, Unauthorized } from '../errors/HttpErrors'

import Account from '../models/Account'
import { AccessToken } from '../tokens/JsonWebToken'

export function local(req: Request, res: Response, next: NextFunction) {
	passport.authenticate('local', { session: false }, (error, user, options) => {
		if (error) {
			return next(error)
		}

		if (options?.message === 'Missing credentials') {
			throw new Unauthorized('Could not authenticate without user credentials.')
		}

		console.log(error, user, options)

		const request = req as any
		request.account = user
		request.authenticated = true

		return next()
	})(req, res, next)
}

export function bearer(req: Request, res: Response, next: NextFunction) {
	passport.authenticate(
		'bearer',
		{ session: false },
		(error, user, options) => {
			if (error) {
				return next(error)
			}

			if (!user) {
				throw new BadRequest('Could not authenticate without bearer token.')
			}

			const request = req as any
			request.token = user.token
			request.account = user.account
			request.authenticated = true

			return next()
		}
	)(req, res, next)
}
