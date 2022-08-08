import { IVerifyOptions } from 'passport-local'
import local from '../../authentication/local'

import TesterAccount from '../utils/TesterAccount'
import Account from '../../models/Account'
import { Unauthorized } from '../../errors/HttpErrors'

function done(error: any, user?: any, options?: IVerifyOptions | undefined) {
	if (error) throw error
}

describe('local authentication strategy', () => {
	jest
		.spyOn(Account, 'findOne')
		.mockReturnValue({ exec: async () => null } as any)

	it('should authenticate user with correct credentials', async () => {
		const { account } = TesterAccount

		jest
			.spyOn(Account, 'findOne')
			.mockReturnValueOnce({ exec: async () => account } as any)

		const username = TesterAccount.username
		const password = TesterAccount.password

		const result = await local(username, password, done)
		expect(result).toBeUndefined()
	})

	it('should not authenticate user with wrong password', async () => {
		const { account } = TesterAccount

		jest
			.spyOn(Account, 'findOne')
			.mockReturnValueOnce({ exec: async () => account } as any)

		const username = TesterAccount.username

		await expect(() => local(username, 'wrongpass', done)).rejects.toThrowError(
			Unauthorized
		)
	})

	it('should not authenticate user with wrong username', async () => {
		await expect(() =>
			local('wronguser', 'wrongpass', done)
		).rejects.toThrowError(Unauthorized)
	})
})
