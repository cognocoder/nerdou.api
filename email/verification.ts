export function address(token: string) {
	const endpoint = process.env.ENDPOINT
	const env = process.env.NODE_ENV
	const port = process.env.PORT
	const url = port && env !== 'production' ? `${endpoint}:${port}` : endpoint
	const address = `${url}/verify/${token}`
	return address
}

export function email(from: string, to: string, address: string) {
	return {
		from,
		to,
		subject: 'nerdou: e-mail de verificação',
		text: `Verifique seu e-mail: ${address}`,
		html: `<h1> nerdou </h1> <p> Verifique seu e-mail: <a href="${address}" alt="verificação">${address}</a></p>`,
	}
}

const verification = { address, email }

export default verification
