import express, { Express, Request, Response } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { NotFound } from '../errors/HttpErrors'
import authentication from '../routes/authentication'
import account from '../routes/account'
import accounts from '../routes/accounts'
import documentation from '../routes/documentation'
import passreset from '../routes/passreset'
import options from '../documentation/options'

const specs = swaggerJsDoc(options)

const routes = (app: Express) => {
	app.use(
		express.json(),
		authentication,
		account,
		accounts,
		documentation,
		passreset
	)

	app.use(
		'/documentation',
		swaggerUi.serve,
		swaggerUi.setup(specs, { explorer: true })
	)

	app.use('/', (req: Request, res: Response) => {
		return res.redirect('/documentation')
	})

	app.use(() => {
		throw new NotFound('Route (resource or service) not found.')
	})
}

export default routes
