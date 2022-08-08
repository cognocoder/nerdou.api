import BearerStrategy from 'passport-http-bearer'

import Account from '../models/Account'
import { AccessToken } from '../tokens/jwt'

import { Unauthorized } from '../errors/HttpErrors'

export const bearer: BearerStrategy.VerifyFunction = async (
	token: string,
	done
) => {
	try {
		const id = await AccessToken.verify(token)
		const account = await Account.findById(id).exec()
		if (!account) {
			throw new Unauthorized('The account was not found.', { id })
		}

		done(null, { account, token })
	} catch (error) {
		done(error)
	}
}

export default bearer
