import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'

import bcrypt from 'bcryptjs'

import Account from '../models/Account'
import { AccessToken } from '../tokens/jwt'

import { Unauthorized } from '../errors/HttpErrors'

export const local: LocalStrategy.VerifyFunction = async (
	username,
	password,
	done
) => {
	try {
		const str = 'Authentication failed with given credentials.'

		const acc = await Account.findOne({ email: username }).exec()
		if (!acc) throw new Unauthorized(str)

		const passcheck = await bcrypt.compare(password, acc.passhash)
		if (!passcheck) throw new Unauthorized(str)

		done(null, acc)
	} catch (error) {
		done(error)
	}
}

export const bearer: BearerStrategy.VerifyFunction = async (
	token: string,
	done
) => {
	try {
		const id = await AccessToken.verify(token)
		const account = await Account.findById(id).exec()
		if (!account) {
			throw new Unauthorized(`The account was not found.`, { id })
		}

		done(null, { account, token })
	} catch (error) {
		done(error)
	}
}

passport.use(new LocalStrategy.Strategy({ session: false }, local))
passport.use(new BearerStrategy.Strategy(bearer))

export default passport
