import { jest } from '@jest/globals'

import dotenv from 'dotenv'

dotenv.config()

import mongo from './databases/mongoose'
import redis from './databases/redis'

beforeAll(async () => {
	await mongo.connect()
	await redis.connect()

	mongo.connection.on('error', (error) => console.log(error))
	redis.on('error', (error) => console.log(error))
})

afterAll(async () => {
	await mongo.connection.close()
	await redis.quit()
})
