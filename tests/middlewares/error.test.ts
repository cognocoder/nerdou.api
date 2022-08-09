import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, Response } from 'express'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { Conflict, MethodNotAllowed } from '../../errors/HttpErrors'
import { handler } from '../../middlewares/errors'

let req: Request
let res: Response
let next: NextFunction

const spies: {
	status?: jest.SpyInstance<Response>
	json?: jest.SpyInstance<Response>
	set?: jest.SpyInstance<Response>
} = {}

describe('error middleware', () => {
	beforeEach(() => {
		const mock = getMockRes()
		req = getMockReq()
		res = mock.res
		next = mock.next

		spies.status = jest.spyOn(res, 'status')
		spies.json = jest.spyOn(res, 'json')
	})

	it('should respond with an internal server error', () => {
		handler(new Error(), req, res, next)
		expect(spies.status).toBeCalledWith(500)
		expect(spies.json).toBeCalled()
	})

	it('should respond with a conflict error', () => {
		handler(new Conflict('Conflict.'), req, res, next)
		expect(spies.status).toBeCalledWith(409)
		expect(spies.json).toBeCalled()
	})

	it('should respond with a method not allowed error', () => {
		spies.set = jest.spyOn(res, 'set')

		const response = handler(
			new MethodNotAllowed('POST (create) resource is not allowe.', 'GET'),
			req,
			res,
			next
		)

		expect(spies.set).toBeCalledWith('Allow', 'GET')
		expect(spies.status).toBeCalledWith(405)
		expect(spies.json).toBeCalled()
	})

	it('should respond json web token error with an unauthorized error', () => {
		handler(new JsonWebTokenError(''), req, res, next)
		expect(spies.status).toBeCalledWith(401)
		expect(spies.json).toBeCalled()
	})

	it('should respond token expired error with an unauthorized error', () => {
		handler(new TokenExpiredError('', new Date()), req, res, next)
		expect(spies.status).toBeCalledWith(401)
		expect(spies.json).toBeCalled()
	})
})
