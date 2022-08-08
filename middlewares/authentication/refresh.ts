import { NextFunction, Request, Response } from 'express'

import Account from '../../models/Account'
import { RefreshToken } from '../../tokens/opaque'

export async function handler(req: Request, res: Response, next: NextFunction) {
	try {
		const { refresh } = req.body
		const id = await RefreshToken.verify(refresh)
		await RefreshToken.revoke(refresh)

		const account = await Account.findById(id).exec()
		const request = req as any
		request.account = account

		return next()
	} catch (error) {
		return next(error)
	}
}

const refresh = { handler }

export default refresh
