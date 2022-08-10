import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { authentication as controller } from '../../controllers/authentication'
import TesterAccount from '../utils/TesterAccount'
import { AccessToken } from '../../tokens/jwt'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
	end?: jest.SpyInstance<Response>
} = {}

describe('delete request for authentication controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
		spies.end = jest.spyOn(res, 'end')
	})

	it('should revoke an access token and a refresh token', async () => {
		const { access } = TesterAccount
		const request = req as any
		request.token = access

		jest.spyOn(AccessToken, 'revoke').mockResolvedValueOnce(true)

		await controller.delete(req, res, next)
		expect(spies.status).toBeCalledWith(204)
		expect(spies.end).toBeCalled()
	})
})
