import { NextFunction, Request, Response } from 'express'
import { getMockReq, getMockRes } from '@jest-mock/express'
import { authentication as controller } from '../../controllers/authentication'
import TesterAccount from '../utils/TesterAccount'
import { AccessToken } from '../../tokens/jwt'
import { RefreshToken } from '../../tokens/opaque'

let req: Request
let res: Response

const next: NextFunction = jest.fn().mockImplementation((error) => {
	if (error) throw error
})

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
	set?: jest.SpyInstance<Response>
} = {}

describe('update (post, patch) request for authentication controller', () => {
	beforeEach(() => {
		req = getMockReq()
		res = getMockRes().res

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
		spies.set = jest.spyOn(res, 'set')
	})

	it('should create or update the access and refresh tokens', async () => {
		const { account, access, refresh } = TesterAccount
		const request = req as any
		request.account = account

		jest.spyOn(AccessToken, 'create').mockReturnValueOnce(access)
		jest.spyOn(RefreshToken, 'create').mockResolvedValueOnce(refresh)

		await controller.update(req, res, next)
		expect(spies.set).toBeCalled()
		expect(spies.status).toBeCalledWith(200)
		expect(spies.json).toBeCalled()
	})

	it('should not create or update the access and refresh tokens', async () => {
		const { access, refresh } = TesterAccount

		jest.spyOn(AccessToken, 'create').mockReturnValueOnce(access)
		jest.spyOn(RefreshToken, 'create').mockResolvedValueOnce(refresh)

		await expect(() => controller.update(req, res, next)).rejects.toThrow()
	})
})
