import { NextFunction, Request, Response } from 'express'

import { Unauthorized } from '../../errors/HttpErrors'

import Account from '../../models/Account'
import { VerifyToken } from '../../tokens/jwt'

export async function handler(req: Request, res: Response, next: NextFunction) {
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

const verify = { handler }

export default verify
