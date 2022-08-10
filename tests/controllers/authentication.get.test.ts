import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { authentication as controller } from '../../controllers/authentication'
import Account from '../../models/Account'
import TesterAccount from '../utils/TesterAccount'
import { BadRequest } from '../../errors/HttpErrors'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
} = {}

describe('get request for authentication controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	it('should verify an account', async () => {
		const { account } = TesterAccount
		const save = (Account.prototype.save = jest
			.fn()
			.mockResolvedValue(() => account))

		try {
			const request = req as any
			request.account = account

			await controller.get(req, res, next)
			expect(spies.status).toBeCalledWith(200)
			expect(spies.json).toBeCalled()
		} finally {
			Account.prototype.save = save
		}
	})

	it('should not verify an invalid account', async () => {
		await expect(() => controller.get(req, res, next)).rejects.toThrowError(
			BadRequest
		)
	})
})
