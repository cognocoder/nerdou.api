import { getMockReq, getMockRes } from '@jest-mock/express'
import { NextFunction, Request, Response } from 'express'
import { NotAllowed } from '../../controllers/error'
import { MethodNotAllowed } from '../../errors/HttpErrors'

let req: Request
let res: Response
let next: NextFunction

describe('requests to error controller', () => {
	beforeEach(() => {
		const mock = getMockRes()
		req = getMockReq()
		res = mock.res
		next = mock.next
	})

	it('should throw not allowed error', () => {
		const handler = NotAllowed(
			'DELETE (remove) resource is not allowed.',
			'GET'
		)

		expect(() => {
			handler(req, res, next)
		}).toThrowError(MethodNotAllowed)
	})
})
