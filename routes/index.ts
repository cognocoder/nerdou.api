import express, { Express, NextFunction, Request, Response } from 'express'
import { NotFound } from '../errors/HttpErrors'

import authentication from '../routes/authentication'
import account from '../routes/account'
import accounts from '../routes/accounts'
import passreset from '../routes/passreset'

const routes = (app: Express) => {
	app.use(express.json(), authentication, account, accounts, passreset)

	app.use(() => {
		throw new NotFound('Route (resource or service) not found.')
	})
}

export default routes
