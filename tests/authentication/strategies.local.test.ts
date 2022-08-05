import { IVerifyOptions } from 'passport-local'
import { strategies } from '../../authentication/strategies'

import TesterAccount from '../utils/TesterAccount'
import Account from '../../models/Account'
import { Unauthorized } from '../../errors/HttpErrors'

const done = (error: any, user?: any, options?: IVerifyOptions | undefined) => {
	if (error) throw error
	return undefined
}

const { username, password, findTester } = TesterAccount

describe('local authentication strategy', () => {
	jest
		.spyOn(Account, 'findOne')
		.mockReturnValue({ exec: async () => findTester(username) } as any)

	it('should authenticate user with correct credentials', async () => {
		const result = await strategies.local(username, password, done)
		expect(result).toBeUndefined()
	})

	it('should not authenticate user with wrong username', async () => {
		await expect(() =>
			strategies.local('wronguser', 'wrongpass', done)
		).rejects.toThrowError(Unauthorized)
	})

	it('should not authenticate user with wrong password', async () => {
		await expect(() =>
			strategies.local(username, 'wrongpass', done)
		).rejects.toThrowError(Unauthorized)
	})
})
