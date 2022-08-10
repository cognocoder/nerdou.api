import redis from '../../databases/redis'
import { InternalServerError, Unauthorized } from '../../errors/HttpErrors'
import { _create, _revoke, _verify } from '../../tokens/opaque'
import TesterAccount from '../utils/TesterAccount'

describe('opaque tokens', () => {
	it('should create an opaque token', async () => {
		const { account } = TesterAccount

		jest.spyOn(redis, 'set').mockResolvedValueOnce('OK')
		jest.spyOn(redis, 'expireAt').mockResolvedValueOnce(true)

		const token = await _create(account._id, 1, 'minutes')
		expect(token.length > 0).toBe(true)
	})

	it('should not create an opaque token', async () => {
		const { account } = TesterAccount

		jest.spyOn(redis, 'set').mockResolvedValueOnce(null)
		jest.spyOn(redis, 'expireAt').mockResolvedValueOnce(true)

		await expect(() => _create(account._id, 1, 'minutes')).rejects.toThrowError(
			InternalServerError
		)
	})

	it('should revoke an opaque token', async () => {
		const { refresh } = TesterAccount

		jest.spyOn(redis, 'del').mockResolvedValueOnce(1)

		const del = await _revoke(refresh)
		expect(del).toBe(true)
	})

	it('should verify an opaque token', async () => {
		const { account, refresh } = TesterAccount

		jest.spyOn(redis, 'get').mockResolvedValueOnce(account._id.toString())

		const id = await _verify(refresh, 'refresh token')
		expect(id).not.toBeNull()
	})

	it('should not verify opaque token for missing token', async () => {
		await expect(() => _verify('', 'refresh token')).rejects.toThrowError(
			Unauthorized
		)
	})

	it('should not verify invalid, expired or revoked opaque token', async () => {
		const { account, refresh } = TesterAccount

		jest.spyOn(redis, 'get').mockResolvedValueOnce(null)

		await expect(() => _verify(refresh, 'refresh token')).rejects.toThrowError(
			Unauthorized
		)
	})
})
