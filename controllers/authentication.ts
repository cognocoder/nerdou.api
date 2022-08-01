import { NextFunction, Request, Response } from 'express'

import Account from '../models/Account'
import { AccessToken } from '../tokens/jwt'
import { RefreshToken } from '../tokens/opaque'
import { BadRequest, MethodNotAllowed } from '../errors/HttpErrors'

const allow = 'POST, DELETE'

const authentication = {
	post: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { account } = req as any
			if (!account || !account.id) {
				throw new BadRequest('Cannot create access token for invalid account.')
			}

			const access = AccessToken.create(account.id)
			const refresh = await RefreshToken.create(account.id)

			res.set('Authorization', access)
			return res.status(200).json({ refresh })
		} catch (error) {
			return next(error)
		}
	},

	get: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			const account = request.account

			if (account instanceof Account) {
				account.verified = new Date()
				await account.save()

				return res.status(200).json(account)
			}

			throw new BadRequest(
				`Could not verify given account ${account.id}.`,
				account
			)
		} catch (error) {
			next(error)
		}
	},

	patch: (req: Request, res: Response) => {
		throw new MethodNotAllowed(
			'PATCH (modify) authentication is not allowed.',
			allow
		)
	},

	delete: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			const token = request.token
			await AccessToken.revoke(token)
			return res.status(204).end()
		} catch (error) {
			return next(error)
		}
	},
}

export default authentication
