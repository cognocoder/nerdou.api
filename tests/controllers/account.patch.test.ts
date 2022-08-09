import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import bcryptjs from 'bcryptjs'

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

describe('patch requests for account controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	jest
		.spyOn(Account, 'findByIdAndUpdate')
		.mockReturnValue({ exec: async () => null } as any)

	it('patches an account by its identifier', async () => {
		const { account } = TesterAccount
		const { password } = TesterAccount
		const { passhash } = account
		account.passhash = password

		jest
			.spyOn(Account, 'findByIdAndUpdate')
			.mockReturnValueOnce({ exec: async () => account } as any)
		jest.spyOn(bcryptjs, 'hash').mockImplementationOnce(() => passhash)

		req.params.id = account._id.toString()
		const request = req as any
		request.body = account

		await controller.patch(req, res, next)

		expect(account.passhash).toBe(passhash)
		expect(spies.status).toBeCalledWith(200)
		expect(spies.json).toBeCalled()
	})

	it('throws if the account was not found', async () => {
		const { account } = TesterAccount
		const { password } = TesterAccount
		account.passhash = password

		req.params.id = account._id.toString()
		const request = req as any
		request.body = account

		await expect(() => controller.patch(req, res, next)).rejects.toThrowError(
			NotFound
		)
	})
})
