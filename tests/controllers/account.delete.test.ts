import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'

import { account as controller } from '../../controllers/account'
import Account from '../../models/Account'
import TesterAccount from '../utils/TesterAccount'
import { NotFound } from '../../errors/HttpErrors'
import { AccessToken } from '../../tokens/jwt'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
} = {}

describe('delete requests for account controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	jest
		.spyOn(Account, 'findByIdAndDelete')
		.mockReturnValue({ exec: async () => null } as any)
	jest.spyOn(AccessToken, 'revoke').mockResolvedValue(true)

	it('should delete an account by its identifier', async () => {
		const { account } = TesterAccount
		const { access } = TesterAccount

		jest
			.spyOn(Account, 'findByIdAndDelete')
			.mockReturnValueOnce({ exec: async () => account } as any)

		req.params.id = account._id.toString()
		const request = req as any
		request.token = access

		await controller.delete(req, res, next)

		expect(spies.status).toBeCalledWith(200)
		expect(spies.json).toBeCalled()
	})

	it('should throw an erorr, the account was not found', async () => {
		const { account } = TesterAccount
		req.params.id = account._id.toString()

		await expect(() => controller.delete(req, res, next)).rejects.toThrowError(
			NotFound
		)
	})
})
