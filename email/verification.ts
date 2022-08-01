export function address(token: string) {
	let endpoint = process.env.ENDPOINT
	const port = process.env.PORT
	if (port) {
		endpoint = `${endpoint}:${port}`
	}
	const address = `${endpoint}/authentication/${token}`
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
