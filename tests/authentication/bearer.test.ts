import { IVerifyOptions } from 'passport-http-bearer'
import bearer from '../../authentication/bearer'

import TesterAccount from '../utils/TesterAccount'
import Account from '../../models/Account'
import { AccessToken } from '../../tokens/jwt'
import { Unauthorized } from '../../errors/HttpErrors'
import { JsonWebTokenError } from 'jsonwebtoken'

function done(error: any, user?: any, options?: string | IVerifyOptions) {
	if (error) throw error
}

const { access, account } = TesterAccount

describe('bearer authentication strategy', () => {
	jest
		.spyOn(Account, 'findById')
		.mockReturnValue({ exec: async () => null } as any)
		.mockReturnValueOnce({ exec: async () => account } as any)

	jest
		.spyOn(AccessToken, 'verify')
		.mockImplementation(() => {
			throw new JsonWebTokenError('')
		})
		.mockResolvedValueOnce(account._id)
		.mockResolvedValueOnce(account._id)

	it('should authenticate user with correct token', async () => {
		const result = await bearer(access, done)
		expect(result).toBeUndefined()
	})

	it('should not authenticate token for an account not found', async () => {
		await expect(() =>
			bearer('access token is well formed, but account does not exist', done)
		).rejects.toThrowError(Unauthorized)
	})

	it('should not authenticate an invalid token', async () => {
		await expect(() =>
			bearer('invalid access token', done)
		).rejects.toThrowError(JsonWebTokenError)
	})
})
