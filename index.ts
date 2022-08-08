import express, { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

import mongo from './databases/mongoose'
import redis from './databases/redis'

import routes from './routes'
import errors from './middlewares/errors'
import mongoose from 'mongoose'

const app: Express = express()
const port = process.env.PORT || 6000
const endpoint = process.env.ENDPOINT || 'http://localhost'

mongo.connect()
mongo.connection.on('error', (error) => console.log(error))
redis.connect()
redis.on('error', (error) => console.log(error))

routes(app)
errors(app)
app.listen(port, () =>
	console.log(`Express @ ${endpoint}:${port}/documentation`)
)
