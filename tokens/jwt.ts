const jwt = require('jsonwebtoken')

import sha256 from 'crypto-js/sha256'
import { ObjectId } from 'mongoose'

import redis from '../databases/redis'

const key = process.env.JSON_WEB_TOKEN_KEY
const prefix = 'blocklist:'

export function _create(
	id: ObjectId,
	time: number,
	unit: 'days' | 'hours' | 'minutes' | 'seconds'
): string {
	const payload = { id }
	const token = jwt.sign(payload, key, { expiresIn: `${time} ${unit}` })
	return token
}

export async function _revoke(token: string) {
	const hash = sha256(token).toString()
	const set = await redis.set(`${prefix}:${hash}`, '')

	const expiration = jwt.decode(token).exp
	const expire = await redis.expireAt(`${prefix}:${hash}`, expiration)

	return set && expire
}

export async function _revoked(prefix: string, token: string) {
	const hash = sha256(token).toString()
	const revoked = (await redis.exists(`${prefix}:${hash}`)) === 1

	return revoked
}

export async function _verify(token: string, type: string): Promise<ObjectId> {
	const revoked = await _revoked(prefix, token)
	if (revoked) {
		throw new jwt.JsonWebTokenError(
			`The ${type} is invalid, expired or revoked.`
		)
	}

	const { id } = jwt.verify(token, key)
	return id
}

/**
 * Create, verify or revoke a Json Web Token to be used as a bearer token
 * within 15 minutes.
 */
export const AccessToken = {
	create(id: ObjectId) {
		return _create(id, 15, 'minutes')
	},

	async verify(token: string) {
		return _verify(token, 'access token')
	},

	async revoke(token: string) {
		return _revoke(token)
	},
}

/**
 * Create or verify a Json Web Token to be used to verify an account within 1
 * hour.
 */
export const VerifyToken = {
	create(id: ObjectId) {
		return _create(id, 1, 'hours')
	},

	verify(token: string) {
		return _verify(token, 'verify token')
	},
}
