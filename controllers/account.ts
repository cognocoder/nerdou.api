import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'

import Account from '../models/Account'
import { MethodNotAllowed, NotFound } from '../errors/HttpErrors'
import { AccessToken } from '../tokens/jwt'

const allow = 'GET, PATCH, DELETE'

const account = {
	/**
	 * (405) Method Not Allowed.
	 */
	post: (req: Request, res: Response) => {
		throw new MethodNotAllowed('POST (create) account is not allowed.', allow)
	},

	/**
	 * Get account.
	 */
	get: async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id

		try {
			const found = await Account.findById(id).exec()
			if (found) {
				return res.status(200).json(found)
			}

			throw new NotFound(`Account ${id} not found.`)
		} catch (error) {
			return next(error)
		}
	},

	/**
	 * (405) Method Not Allowed.
	 */
	put: async (req: Request, res: Response) => {
		throw new MethodNotAllowed('PUT (replace) account is not allowed.', allow)
	},

	/**
	 * Update (modify) account.
	 */
	patch: async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id
		const acc = req.body

		if (acc.passhash) {
			acc.passhash = await bcryptjs.hash(acc.passhash, 12)
		}

		try {
			const found = await Account.findByIdAndUpdate(id, acc, {
				new: true,
				runValidators: true,
			}).exec()

			if (found) {
				return res.status(200).json(found)
			}

			throw new NotFound(`Account ${id} not found.`)
		} catch (error) {
			return next(error)
		}
	},

	/**
	 * Remove account.
	 */
	delete: async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id

		try {
			const found = await Account.findByIdAndDelete(id).exec()
			if (found) {
				const request = req as any
				const token = request.token
				await AccessToken.revoke(token)

				return res.status(200).json(found)
			}

			throw new NotFound(`Account ${id} not found.`)
		} catch (error) {
			return next(error)
		}
	},
}

export default account
