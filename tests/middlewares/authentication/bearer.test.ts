import { getMockReq } from '@jest-mock/express'
import { Unauthorized } from '../../../errors/HttpErrors'
import { callback as bearer } from '../../../middlewares/authentication/bearer'
import TesterAccount from '../../utils/TesterAccount'

const req = getMockReq()
function next() {}

const { account, access } = TesterAccount

describe('bearer authentication middleware', () => {
	it('should foward request on verification', () => {
		const result = bearer(req, next, null, { account, access })
		expect(result).toBeUndefined()
	})

	it('should foward error on verification failure', () => {
		const result = bearer(req, next, {})
		expect(result).toBeUndefined()
	})

	it('should not foward request with missing credentials', () => {
		expect(() => bearer(req, next, null, null)).toThrowError(Unauthorized)
	})
})
