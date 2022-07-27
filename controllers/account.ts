import { Request, Response } from 'express'

import Account from '../models/account'

const account = {
	post: (req: Request, res: Response) => {
		return res.status(405).end()
	},

	get: async (req: Request, res: Response) => {
		const id = req.params.id

		try {
			const found = await Account.findById(id)
			if (found) {
				return res.status(200).json(found)
			}
			return res.status(404).end()
		} catch (error) {
			return res.status(500).json(error)
		}
	},

	put: async (req: Request, res: Response) => {
		return res.status(405).end()
	},

	patch: async (req: Request, res: Response) => {
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
			return res.status(404).end()
		} catch (error) {
			return res.status(500).json(error)
		}
	},

	delete: async (req: Request, res: Response) => {
		const id = req.params.id

		try {
			const found = await Account.findByIdAndDelete(id).exec()
			if (found) {
				return res.status(200).json(found)
			}
			return res.status(404).end()
		} catch (error) {
			return res.status(500).json(error)
		}
	},
}

export default account
