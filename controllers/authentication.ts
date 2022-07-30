import { NextFunction, Request, Response } from 'express'

import { AccessToken } from '../tokens/JsonWebToken'
import { BadRequest, MethodNotAllowed } from '../errors/HttpErrors'
import { RefreshToken } from '../tokens/OpaqueToken'
import { ObjectId } from 'mongoose'

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

	get: async (req: Request, res: Response) => {
		throw new MethodNotAllowed(
			'GET (read) authentication is not allowed.',
			allow
		)
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
