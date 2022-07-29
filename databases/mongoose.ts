import mongoose from 'mongoose'

const connection_string = `${process.env.MONGO_PROTOCOL}\
://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}\
@${process.env.MONGO_URL}`

mongoose.connect(connection_string).catch((error) => {
	console.log(error)
})

const connection = mongoose.connection

export default connection
