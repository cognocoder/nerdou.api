import passport from 'passport'
import LocalStrategy from 'passport-local'
import BearerStrategy from 'passport-http-bearer'

import bcrypt from 'bcryptjs'

import Account from '../models/Account'
import { AccessToken } from '../tokens/jwt'

import { Unauthorized } from '../errors/HttpErrors'

passport.use(
	new LocalStrategy.Strategy(
		{ session: false },
		async (username, password, done) => {
			try {
				const str = `Could not authenticate account for e-mail ${username} with given credentials.`

				const acc = await Account.findOne({ email: username }).exec()
				if (!acc) throw new Unauthorized(str)

				const passcheck = await bcrypt.compare(password, acc.passhash)
				if (!passcheck) throw new Unauthorized(str)

				done(null, acc)
			} catch (error) {
				done(error)
			}
		}
	)
)

passport.use(
	new BearerStrategy.Strategy(async (token: string, done) => {
		try {
			const id = await AccessToken.verify(token)
			const account = await Account.findById(id).exec()
			if (!account) {
				throw new Unauthorized(`Account identified by ${id} not found.`)
			}

			done(null, { account, token })
		} catch (error) {
			done(error)
		}
	})
)

export default passport
