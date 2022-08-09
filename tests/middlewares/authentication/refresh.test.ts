import { Request, Response, NextFunction } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { Unauthorized } from '../../../errors/HttpErrors'
import { handler } from '../../../middlewares/authentication/refresh'
import TesterAccount from '../../utils/TesterAccount'
import Account from '../../../models/Account'
import { RefreshToken } from '../../../tokens/opaque'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

describe('refresh authentication middleware', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res
	})

	jest
		.spyOn(Account, 'findById')
		.mockReturnValue({ exec: async () => null } as any)

	jest.spyOn(RefreshToken, 'verify').mockImplementation(async () => {
		throw new Unauthorized('')
	})

	it('should foward request with correct refresh token', async () => {
		const { account } = TesterAccount
		const refresh = TesterAccount.refresh

		jest
			.spyOn(Account, 'findById')
			.mockReturnValueOnce({ exec: async () => account } as any)
		jest
			.spyOn(RefreshToken, 'verify')
			.mockResolvedValueOnce(account._id.toString())

		req.body = { ...req.body, refresh }

		const result = await handler(req, res, next)
		expect(result).toBeUndefined()
	})

	it('should not foward request for account not found', async () => {
		const { account } = TesterAccount
		const refresh = TesterAccount.refresh

		jest
			.spyOn(RefreshToken, 'verify')
			.mockResolvedValueOnce(account._id.toString())

		req.body = { ...req.body, refresh }

		await expect(() => handler(req, res, next)).rejects.toThrowError(
			Unauthorized
		)
	})

	it('should not foward request for invalid refresh token', async () => {
		await expect(() => handler(req, res, next)).rejects.toThrowError(
			Unauthorized
		)
	})
})
