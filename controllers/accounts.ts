import { Request, Response } from 'express'

import Account from '../models/account'

const accounts = {
	post: async (req: Request, res: Response) => {
		const acc = new Account(req.body)

		const found = await Account.find({ email: acc.email })
		if (found.length) {
			return res.status(400).json({
				error: 'Validation Error',
				message: 'Account validation failed: Path `email` must be unique.',
				value: acc.email,
			})
		}

		acc.save((error) => {
			if (error?.name) {
				return res.status(400).json(error)
			} else {
				return res.status(201).json(acc)
			}
		})
	},

	get: async (req: Request, res: Response) => {
		const accounts = await Account.find()
		return res.status(200).json(accounts)
	},

	put: (req: Request, res: Response) => {
		res.status(405).end()
	},

	patch: (req: Request, res: Response) => {
		res.status(405).end()
	},

	delete: (req: Request, res: Response) => {
		res.status(405).end()
	},
}

export default accounts
