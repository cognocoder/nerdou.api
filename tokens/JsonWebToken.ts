const jwt = require('jsonwebtoken')

import sha256 from 'crypto-js/sha256'
import { ObjectId } from 'mongoose'

import redis from '../databases/redis'

const key = process.env.JSON_WEB_TOKEN_KEY
const prefix = 'blocklist:'

function _create(
	id: ObjectId,
	time: number,
	unit: 'days' | 'hours' | 'minutes'
): string {
	const payload = { id }
	const token = jwt.sign(payload, key, { expiresIn: `${time} ${unit}` })
	return token
}

async function _revoked(prefix: string, token: string) {
	const hash = sha256(token).toString()
	const revoked = (await redis.exists(`${prefix}:${hash}`)) === 1

	return revoked
}

async function _verify(token: string) {
	const { id } = jwt.verify(token, key)
	return id
}

export const AccessToken = {
	create(id: ObjectId) {
		return _create(id, 15, 'minutes')
	},

	async verify(token: string) {
		const revoked = await _revoked(prefix, token)
		if (revoked) {
			throw new jwt.JsonWebTokenError('Access Token revoked.')
		}
		return _verify(token)
	},

	async revoke(token: string) {
		const expiration = jwt.decode(token).exp
		const hash = sha256(token).toString()

		const set = (await redis.set(`${prefix}:${hash}`, '')) !== null
		const expire = await redis.expireAt(`${prefix}:${hash}`, expiration)

		return set && expire
	},
}
