import { HydratedDocument } from 'mongoose'
import Account, { IAccount } from '../../models/Account'

const username = 'tester@tester.test'
const password = 'testerbot'

const account: HydratedDocument<IAccount> = new Account({
	email: 'tester@tester.test',
	passhash: '$2a$12$rZ3E8jB18xeev2Zh.e39VeC1jBGQ4Xmba6nWKYsp4kXQWOVHZDd.e',
	username: 'tester',
	_id: '62e96d93428187ac34956f2b',
})

const findTester = (username: string) => {
	if (username === 'tester@tester.test') {
		return account
	}
	return null
}

const TesterAccount = {
	username,
	password,
	account,
	findTester,
}

export default TesterAccount
