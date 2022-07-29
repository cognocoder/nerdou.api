import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

import connection from './database/connection'
import routes from './routes'
import errors from './middlewares/errors'

const app: Express = express()
const port = process.env.PORT || 6000

connection.on('error', (error) => console.log(error))

routes(app)
errors(app)
app.listen(port)
