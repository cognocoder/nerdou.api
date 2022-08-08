import { getMockReq } from '@jest-mock/express'

import { callback as local } from '../../../middlewares/authentication/local'
import TesterAccount from '../../utils/TesterAccount'
import { Unauthorized } from '../../../errors/HttpErrors'

const req = getMockReq()
const next = () => {}
const { account } = TesterAccount
const message = 'Missing credentials'

describe('local authentication middleware', () => {
	it('should foward request on verification', () => {
		const result = local(req, next, null, account, {})
		expect(result).toBeUndefined()
	})

	it('should foward error on verfication failure', () => {
		const result = local(req, next, {})
		expect(result).toBeUndefined()
	})

	it('should not foward request with missing credentials', () => {
		expect(() => local(req, next, null, null, { message })).toThrowError(
			Unauthorized
		)
	})
})
