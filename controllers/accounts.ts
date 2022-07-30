import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'

import Account from '../models/Account'
import { BadRequest, MethodNotAllowed } from '../errors/HttpErrors'

const allow = 'POST, GET'

const accounts = {
	post: async (req: Request, res: Response, next: NextFunction) => {
		const acc = new Account(req.body)

		try {
			const found = await Account.findOne({ email: acc.email })
			if (found) {
				throw new BadRequest(`Account for e-mail ${acc.email} already exists.`)
			}

			await acc.validate()
			acc.passhash = await bcryptjs.hash(acc.passhash, 12)
			const saved = await acc.save()

			return res.status(201).json(saved)
		} catch (error) {
			return next(error)
		}
	},

	get: async (req: Request, res: Response) => {
		const accounts = await Account.find()
		return res.status(200).json(accounts)
	},

	put: (req: Request, res: Response) => {
		throw new MethodNotAllowed('PUT (replace) accounts is not allowed.', allow)
	},

	patch: (req: Request, res: Response) => {
		throw new MethodNotAllowed('PATCH (modify) accounts is not allowed.', allow)
	},

	delete: (req: Request, res: Response) => {
		throw new MethodNotAllowed(
			'DELETE (remove) accounts is not allowed.',
			allow
		)
	},
}

export default accounts
