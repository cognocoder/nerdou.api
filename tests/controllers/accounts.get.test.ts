import { Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { accounts as controller } from '../../controllers/accounts'
import Account from '../../models/Account'

let req: Request
let res: Response

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
} = {}

describe('get request for accounts controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	jest
		.spyOn(Account, 'find')
		.mockReturnValueOnce({ exec: async () => [] } as any)

	it('should get accounts', async () => {
		await controller.get(req, res)
		expect(spies.status).toBeCalledWith(200)
		expect(spies.json).toBeCalled()
	})
})
