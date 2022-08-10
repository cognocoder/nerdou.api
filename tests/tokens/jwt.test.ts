import { JsonWebTokenError } from 'jsonwebtoken'
import redis from '../../databases/redis'
import { _create, _revoke, _revoked, _verify } from '../../tokens/jwt'
import TesterAccount from '../utils/TesterAccount'

const jwt = require('jsonwebtoken')

describe('json web tokens', () => {
	it('should create a json web token', () => {
		const { account } = TesterAccount
		const token = _create(account._id, 1, 'minutes')
		expect(token.length > 0).toBe(true)
	})

	it('should verify a json web token', async () => {
		const { access, account } = TesterAccount

		jest.spyOn(redis, 'exists').mockResolvedValueOnce(0)
		jest.spyOn(jwt, 'verify').mockReturnValue({ id: account._id })

		const id = await _verify(access, 'access token')
		expect(id).not.toBeNull()
	})

	it('should not verify a json web token', async () => {
		const { access } = TesterAccount

		jest.spyOn(redis, 'exists').mockResolvedValueOnce(1)

		await expect(() => _verify(access, 'access token')).rejects.toThrowError(
			JsonWebTokenError
		)
	})

	it('should revoke a json web token', async () => {
		const { access } = TesterAccount

		jest.spyOn(redis, 'set').mockResolvedValueOnce('OK')
		jest.spyOn(redis, 'expireAt').mockResolvedValueOnce(true)

		const revoke = await _revoke(access)
		expect(revoke).toBeTruthy()
	})
})
