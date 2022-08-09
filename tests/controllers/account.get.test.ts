import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'

import { account as controller } from '../../controllers/account'
import Account from '../../models/Account'
import TesterAccount from '../utils/TesterAccount'
import { NotFound } from '../../errors/HttpErrors'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
} = {}

describe('get requests for account controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	jest
		.spyOn(Account, 'findById')
		.mockReturnValue({ exec: async () => null } as any)

	it('gets an account by its identifier', async () => {
		const { account } = TesterAccount

		jest
			.spyOn(Account, 'findById')
			.mockReturnValueOnce({ exec: async () => account } as any)

		req.params.id = account._id.toString()
		await controller.get(req, res, next)

		expect(spies.status).toBeCalledWith(200)
		expect(spies.json).toBeCalled()
	})

	it('throws if the account was not found', async () => {
		await expect(() => controller.get(req, res, next)).rejects.toThrowError(
			NotFound
		)
	})
})
