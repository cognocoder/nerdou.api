import { createClient } from 'redis'

const client = createClient({
	socket: {
		host: process.env.REDIS_URL,
		port: Number(process.env.REDIS_PORT),
	},
	password: process.env.REDIS_PASSWORD,
})

client.connect()

export default client
