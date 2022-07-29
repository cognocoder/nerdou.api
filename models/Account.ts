import mongoose, { Document } from 'mongoose'

import Patterns from '../validators/patterns'

const AccountSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		validate: Patterns.Account.email,
	},
	passhash: {
		type: String,
		validate: Patterns.Account.passhash,
	},
	username: {
		type: String,
		validate: Patterns.Account.username,
	},
})

const Account = mongoose.model('Account', AccountSchema)

export default Account
