import { NextFunction, Request, Response } from 'express'

import Account from '../models/Account'
import { AccessToken } from '../tokens/jwt'
import { RefreshToken } from '../tokens/opaque'
import { BadRequest } from '../errors/HttpErrors'

export const authentication = {
	/**
	 * Create or update an access and a refresh token.
	 */
	update: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { account } = req as any

			const access = AccessToken.create(account.id)
			const refresh = await RefreshToken.create(account.id)

			res.set('Authorization', `Bearer ${access}`)
			return res.status(200).json({ refresh })
		} catch (error) {
			return next(error)
		}
	},

	/**
	 * Verify account.
	 */
	get: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			const { account } = request

			if (account instanceof Account) {
				account.verified = new Date()
				await account.save()

				return res.status(200).json(account)
			}

			throw new BadRequest(`The account was not verify.`, { account })
		} catch (error) {
			return next(error)
		}
	},

	/**
	 * Revoke access and refresh tokens.
	 */
	delete: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			const { token } = request
			await AccessToken.revoke(token)

			return res.status(204).end()
		} catch (error) {
			return next(error)
		}
	},
}

export default authentication
