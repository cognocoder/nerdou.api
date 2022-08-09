import { Request, Response, NextFunction } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'

import Account from '../../../models/Account'
import { VerifyToken } from '../../../tokens/jwt'
import { Unauthorized } from '../../../errors/HttpErrors'
import TesterAccount from '../../utils/TesterAccount'
import { handler } from '../../../middlewares/authentication/verify'
import { JsonWebTokenError } from 'jsonwebtoken'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

describe('verify authentication middleware', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res
	})

	jest
		.spyOn(Account, 'findById')
		.mockReturnValue({ exec: async () => null } as any)

	jest.spyOn(VerifyToken, 'verify').mockImplementation(async () => {
		throw new JsonWebTokenError('')
	})

	it('should foward request with correct verify token', async () => {
		const { account } = TesterAccount
		const verify = TesterAccount.verify

		jest.spyOn(VerifyToken, 'verify').mockResolvedValueOnce(account._id)
		jest
			.spyOn(Account, 'findById')
			.mockReturnValueOnce({ exec: async () => account } as any)

		req.params.token = verify
		const result = await handler(req, res, next)
		expect(result).toBeUndefined()
	})

	it('should not foward request for account not found', async () => {
		const { account } = TesterAccount
		const verify = TesterAccount.verify

		jest.spyOn(VerifyToken, 'verify').mockResolvedValueOnce(account._id)

		req.params.token = verify
		expect(async () => handler(req, res, next)).rejects.toThrowError(
			Unauthorized
		)
	})

	it('should not foward request for invalid verify token', async () => {
		expect(async () => await handler(req, res, next)).rejects.toThrowError(
			JsonWebTokenError
		)
	})
})
