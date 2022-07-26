import express, { Express, NextFunction, Request, Response } from 'express'
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { NotFound } from '../errors/HttpErrors'
import authentication from '../routes/authentication'
import verify from '../routes/verify'
import account from '../routes/account'
import accounts from '../routes/accounts'
import documentation from '../routes/documentation'
import passreset from '../routes/passreset'
import options from '../documentation/options'

const cors = require('cors')
const specs = swaggerJsDoc(options)

const routes = (app: Express) => {
	app.use(
		cors({
			origin: process.env.NERDOU_WEB_ORIGIN,
			methods: 'GET, POST, PUT, PATCH, DELETE',
			allowedHeaders: 'Origin, Content-Type, Accept, Authorization',
			exposedHeaders: 'Content-Type, Authorization',
			credentials: true,
			preflightContinue: true,
		})
	)

	app.use(
		express.json(),
		authentication,
		verify,
		account,
		accounts,
		documentation,
		passreset
	)

	app.use('/documentation', swaggerUi.serve, swaggerUi.setup(specs))

	app.use('/', (req: Request, res: Response, next: NextFunction) => {
		if (req.url === '/') {
			return res.redirect('/documentation')
		}
		next()
	})

	app.use(() => {
		throw new NotFound('Route (resource or service) not found.')
	})
}

export default routes
