import express, { Express, Request, Response } from 'express'

import account from '../routes/account'
import accounts from '../routes/accounts'

const routes = (app: Express) => {
	app.get('/', (req: Request, res: Response) => {
		res.status(404).end()
	})

	app.use(express.json(), account, accounts)

	return app
}

export default routes
