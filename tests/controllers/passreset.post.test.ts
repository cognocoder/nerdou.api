import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import Account from '../../models/Account'
import TesterAccount from '../utils/TesterAccount'
import { passreset as controller } from '../../controllers/passreset'
import { ResetToken } from '../../tokens/opaque'
import mailer from '../../email'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

let proto: {
	save?: jest.Mock<any, any>
} = {}

let spies: {
	status?: jest.SpyInstance<Response>
	end?: jest.SpyInstance<Response>
} = {}

describe('patch request to passreset controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.end = jest.spyOn(res, 'end')
	})

	it('should redefine passhash', async () => {
		const { account, reset } = TesterAccount
		const request = req as any
		request.body = { email: account.email }

		jest.spyOn(ResetToken, 'create').mockResolvedValue(reset)

		jest.spyOn(mailer, 'send').mockResolvedValue(undefined)

		jest
			.spyOn(Account, 'findOne')
			.mockReturnValueOnce({ exec: async () => account } as any)

		await controller.post(req, res, next)
		expect(spies.status).toBeCalledWith(204)
		expect(spies.end).toBeCalled()
	})

	it('should not send e-mail for missing e-mail', async () => {
		await controller.post(req, res, next)
		expect(spies.status).toBeCalledWith(204)
		expect(spies.end).toBeCalled()
	})

	it('should not send e-mail for account not found', async () => {
		const { account } = TesterAccount
		const request = req as any
		request.body = { email: account.email }

		jest
			.spyOn(Account, 'findOne')
			.mockReturnValueOnce({ exec: async () => null } as any)

		await controller.post(req, res, next)
		expect(spies.status).toBeCalledWith(204)
		expect(spies.end).toBeCalled()
	})
})
