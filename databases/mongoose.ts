import mongoose from 'mongoose'

const connection_string = `${process.env.MONGO_PROTOCOL}\
://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}\
@${process.env.MONGO_URL}`

const connect = async function () {
	try {
		await mongoose.connect(connection_string)
	} catch (error) {
		console.log(error)
	}
}

const mongo = { connect, connection: mongoose.connection }

export default mongo
