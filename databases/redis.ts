import { createClient } from 'redis'

const redis = createClient({
	socket: {
		host: process.env.REDIS_URL,
		port: Number(process.env.REDIS_PORT),
	},
	password: process.env.REDIS_PASSWORD,
})

export default redis
