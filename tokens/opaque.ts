import { ObjectId } from 'mongoose'
import { customAlphabet as nanoid } from 'nanoid'
import { DateTime } from 'luxon'

import redis from '../databases/redis'
import { InternalServerError, Unauthorized } from '../errors/HttpErrors'

const Base64 =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
const prefix = 'allowlist'

export async function _create(
	id: ObjectId,
	time: number,
	unit: 'days' | 'hours' | 'minutes' | 'seconds'
): Promise<string> {
	const token = nanoid(Base64, 24)()

	const key = `${prefix}:${token}`
	const set = await redis.set(key, id.toString())

	const expiration = DateTime.now()
		.plus({ [unit]: time })
		.toUnixInteger()
	const expire = await redis.expireAt(key, expiration)

	if (set?.length && expire) {
		return token
	}

	throw new InternalServerError('Could not create opaque token.', {
		set,
		expire,
	})
}

export async function _revoke(token: string) {
	const del = await redis.del(`${prefix}:${token}`)
	return del > 0
}

export async function _verify(token: string, type: string) {
	if (!token) {
		throw new Unauthorized(`The ${type} is missing.`)
	}

	const id = await redis.get(`${prefix}:${token}`)
	if (!id) {
		throw new Unauthorized(`The ${type} is invalid, expired or revoked.`)
	}

	return id
}

/**
 * Create, verify or revoke opaque tokens to refresh the bearer token within
 * 5 days.
 */
export const RefreshToken = {
	async create(id: ObjectId) {
		return await _create(id, 5, 'days')
	},

	async verify(token: string) {
		return await _verify(token, 'refresh token')
	},

	async revoke(token: string) {
		return await _revoke(token)
	},
}

/**
 * Create or verify opaque tokens to reset the passhash of an account within
 * 1 hour.
 */
export const ResetToken = {
	async create(id: ObjectId) {
		return await _create(id, 1, 'hours')
	},

	async verify(token: string) {
		return await _verify(token, 'reset token')
	},
}
