import { IVerifyOptions } from 'passport-local'
import { local, bearer } from '../authentication/strategies'

import { HydratedDocument } from 'mongoose'

import Account, { IAccount } from '../models/Account'

const username = 'tester@tester.test'
const password = 'testerbot'

const account: HydratedDocument<IAccount> = new Account({
	email: 'tester@tester.test',
	passhash: '2a$12$cJx0VjHcndq1fb3EHOFGZOcbvfScM3yTS8LcvMnThqwBt57zBAQFy',
	username: 'tester',
	_id: '62e96d93428187ac34956f2b',
})

const done = (
	error: any,
	user?: any,
	options?: IVerifyOptions | undefined
) => {}

describe('authentication strategies', () => {
	it('should authenticate user with correct credentials', async () => {
		jest.spyOn(Account, 'findOne').mockResolvedValue(account)
		await local(username, password, done)
	})
})
