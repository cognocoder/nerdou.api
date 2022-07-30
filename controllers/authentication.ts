import { NextFunction, Request, Response } from 'express'

import { AccessToken } from '../tokens/JsonWebToken'
import { BadRequest, MethodNotAllowed } from '../errors/HttpErrors'

const allow = 'POST, DELETE'

const authentication = {
	post: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			if (!request.account || !request.account.id) {
				throw new BadRequest('Cannot create access token for invalid account.')
			}

			const access = AccessToken.create(request.account.id)
			res.set('Authorization', access)

			return res.status(204).end()
		} catch (error) {
			next(error)
		}
	},

	get: async (req: Request, res: Response) => {
		throw new MethodNotAllowed(
			'GET (read) authentication is not allowed.',
			allow
		)
	},

	put: (req: Request, res: Response) => {
		throw new MethodNotAllowed(
			'PUT (replace) authentication is not allowed.',
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
			res.status(204).end()
		} catch (error) {
			next(error)
		}
	},
}

export default authentication
