import mongoose from 'mongoose'

const email_pattern =
	/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const AccountSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		validate: email_pattern,
	},
	passhash: { type: String, minlength: 8 },
	username: { type: String, minlength: 2 },
})

const Account = mongoose.model('Account', AccountSchema)

export default Account
