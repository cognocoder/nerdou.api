import { model, Document, Schema, ObjectId } from 'mongoose'

import Patterns from '../validators/patterns'

export interface IAccount extends Document {
	_id?: ObjectId
	email: string
	passhash: string
	username?: string
	verified?: Date
}

const AccountSchema: Schema = new Schema<IAccount>({
	email: {
		type: String,
		unique: true,
		required: true,
		validate: Patterns.Account.email,
	},
	passhash: {
		type: String,
		required: true,
		validate: Patterns.Account.passhash,
	},
	username: {
		type: String,
		validate: Patterns.Account.username,
	},
	verified: Date,
})

const Account = model<IAccount>('Account', AccountSchema)

export default Account
