import LocalStrategy from 'passport-local'
import bcrypt from 'bcryptjs'

import Account from '../models/Account'
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

export default local
