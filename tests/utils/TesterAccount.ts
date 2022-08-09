import { HydratedDocument } from 'mongoose'
import Account, { IAccount } from '../../models/Account'

import { JsonWebTokenError } from 'jsonwebtoken'

const username = 'tester@tester.test'
const password = 'testerbot'

const access =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZWFlYzcwYTI0ZGU0MTA2NzNmN2I2YSIsImlhdCI6MTY1OTk3MjIwNywiZXhwIjoxNjU5OTczMTA3fQ.wMXBAdNBqK2YHHO0EoCu60ibBPw_9G3w308gZj8O89k'
const refresh = 'HqQYSIkCInMEPDVNNOGuJT4z'

const account: HydratedDocument<IAccount> = new Account({
	email: 'tester@tester.test',
	passhash: '$2a$12$rZ3E8jB18xeev2Zh.e39VeC1jBGQ4Xmba6nWKYsp4kXQWOVHZDd.e',
	username: 'tester',
	_id: '62e96d93428187ac34956f2b',
})

const TesterAccount = {
	username,
	password,
	access,
	account,
	refresh,
	verify: access,
}

export default TesterAccount
