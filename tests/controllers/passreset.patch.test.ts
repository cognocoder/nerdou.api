import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import Account from '../../models/Account'
import TesterAccount from '../utils/TesterAccount'
import { passreset as controller } from '../../controllers/passreset'
import { ResetToken } from '../../tokens/opaque'

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
	json?: jest.SpyInstance<Response>
} = {}

describe('patch request to passreset controller', () => {
	beforeAll(() => {
		const { account } = TesterAccount
		proto.save = Account.prototype.save
		Account.prototype.save = jest.fn().mockResolvedValue(account)
	})

	afterAll(() => {
		Account.prototype.save = proto.save
	})

	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	it('should redefine the account passhash', async () => {
		const { account, password, reset } = TesterAccount
		const request = req as any
		request.body = { passhash: password, token: reset }

		jest.spyOn(ResetToken, 'verify').mockResolvedValue(account._id.toString())

		jest
			.spyOn(Account, 'findById')
			.mockReturnValueOnce({ exec: async () => account } as any)

		await controller.patch(req, res, next)
		expect(account.passhash).not.toBe(password)
		expect(spies.status).toBeCalledWith(200)
		expect(spies.json).toBeCalled()
	})
})
