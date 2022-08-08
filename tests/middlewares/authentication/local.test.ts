import { Request } from 'express'
import { getMockReq } from '@jest-mock/express'

import { callback as local } from '../../../middlewares/authentication/local'
import TesterAccount from '../../utils/TesterAccount'
import { Unauthorized } from '../../../errors/HttpErrors'

let req: Request
function next() {}

describe('local authentication middleware', () => {
	beforeEach(() => {
		req = getMockReq()
	})

	it('should foward request on verification', () => {
		const { account } = TesterAccount

		const result = local(req, next, null, account, {})
		expect(result).toBeUndefined()
	})

	it('should foward error on verfication failure', () => {
		const result = local(req, next, {})
		expect(result).toBeUndefined()
	})

	it('should not foward request with missing credentials', () => {
		const message = 'Missing credentials'

		expect(() => local(req, next, null, null, { message })).toThrowError(
			Unauthorized
		)
	})
})
