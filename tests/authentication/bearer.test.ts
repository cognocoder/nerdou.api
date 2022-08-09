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

describe('bearer authentication strategy', () => {
	jest
		.spyOn(Account, 'findById')
		.mockReturnValue({ exec: async () => null } as any)

	jest.spyOn(AccessToken, 'verify').mockImplementation(() => {
		throw new JsonWebTokenError('')
	})

	it('should authenticate user with correct token', async () => {
		const { account } = TesterAccount
		const access = TesterAccount.access

		jest.spyOn(AccessToken, 'verify').mockResolvedValueOnce(account._id)
		jest
			.spyOn(Account, 'findById')
			.mockReturnValueOnce({ exec: async () => account } as any)

		const result = await bearer(access, done)
		expect(result).toBeUndefined()
	})

	it('should not authenticate token for account not found', async () => {
		const { account } = TesterAccount

		jest.spyOn(AccessToken, 'verify').mockResolvedValueOnce(account._id)

		await expect(() =>
			bearer('access token is well formed, but account does not exist', done)
		).rejects.toThrowError(Unauthorized)
	})

	it('should not authenticate an invalid access token', async () => {
		await expect(() =>
			bearer('invalid access token', done)
		).rejects.toThrowError(JsonWebTokenError)
	})
})
