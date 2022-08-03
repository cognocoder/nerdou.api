import { NextFunction, Request, Response } from 'express'

import passport from '../authentication/strategies'

import { Unauthorized } from '../errors/HttpErrors'

import Account from '../models/Account'
import { VerifyToken } from '../tokens/jwt'
import { RefreshToken } from '../tokens/opaque'

export function local(req: Request, res: Response, next: NextFunction) {
	passport.authenticate('local', { session: false }, (error, user, options) => {
		if (error) {
			return next(error)
		}

		if (options?.message === 'Missing credentials') {
			throw new Unauthorized('The user credentials are missing.')
		}

		const request = req as any
		request.account = user
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
				throw new Unauthorized('The access token is missing.')
			}

			const request = req as any
			request.token = user.token
			request.account = user.account
			return next()
		}
	)(req, res, next)
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
	try {
		const { refresh } = req.body
		const id = await RefreshToken.verify(refresh)
		await RefreshToken.revoke(refresh)

		const account = await Account.findById(id).exec()
		const request = req as any
		request.account = account

		return next()
	} catch (error) {
		return next(error)
	}
}

export async function verify(req: Request, res: Response, next: NextFunction) {
	try {
		const { token } = req.params
		const id = await VerifyToken.verify(token)

		const account = await Account.findById(id).exec()
		if (!account) {
			throw new Unauthorized(`The account ${id} was not found.`, { token })
		}

		const request = req as any
		request.account = account

		return next()
	} catch (error) {
		return next(error)
	}
}

const middlewares = { local, bearer, refresh, verify }

export default middlewares
