import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { accounts as controller } from '../../controllers/accounts'
import Account from '../../models/Account'
import TesterAccount from '../utils/TesterAccount'
import { BadRequest } from '../../errors/HttpErrors'
import mailer from '../../email'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
} = {}

describe('post request for accounts controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	it('should create an account', async () => {
		const { account, password } = TesterAccount
		req.body = {
			email: account.email,
			passhash: password,
			username: account.username,
		}

		Account.prototype.save = jest.fn().mockResolvedValue(() => account)
		jest
			.spyOn(Account, 'findOne')
			.mockReturnValueOnce({ exec: async () => null } as any)
		jest.spyOn(mailer, 'send').mockResolvedValue(undefined)

		await controller.post(req, res, next)
		expect(spies.status).toBeCalledWith(201)
		expect(spies.json).toBeCalled()
	})

	it('should not create an account for e-mail already taken', async () => {
		const { account, password } = TesterAccount
		jest
			.spyOn(Account, 'findOne')
			.mockReturnValueOnce({ exec: async () => account } as any)

		req.body = {
			email: account.email,
			passhash: password,
			username: account.username,
		}

		await expect(() => controller.post(req, res, next)).rejects.toThrowError(
			BadRequest
		)
	})
})
