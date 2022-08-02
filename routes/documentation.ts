import { Express } from 'express'

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import options from '../documentation/options'

const specs = swaggerJsDoc(options)

const documentation = (app: Express) => {
	app.use(
		'/documentation',
		swaggerUi.serve,
		swaggerUi.setup(specs, { explorer: true })
	)
}

export default documentation
