import { NextFunction, Request, Response } from 'express'

import Account from '../models/account'
import { MethodNotAllowed, NotFound } from '../errors/HttpErrors'

const allow = 'GET, PATCH, DELETE'

const account = {
	post: (req: Request, res: Response) => {
		throw new MethodNotAllowed('POST (create) account is not allowed.', allow)
	},

	get: async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id

		try {
			const found = await Account.findById(id).exec()
			if (found) {
				return res.status(200).json(found)
			}

			throw new NotFound(`Account ${id} not found.`)
		} catch (error) {
			next(error)
		}
	},

	put: async (req: Request, res: Response) => {
		throw new MethodNotAllowed('PUT (replace) account is not allowed.', allow)
	},

	patch: async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id
		const acc = req.body

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
			next(error)
		}
	},

	delete: async (req: Request, res: Response, next: NextFunction) => {
		const id = req.params.id

		try {
			const found = await Account.findByIdAndDelete(id).exec()
			if (found) {
				return res.status(200).json(found)
			}

			throw new NotFound(`Account ${id} not found.`)
		} catch (error) {
			next(error)
		}
	},
}

export default account
