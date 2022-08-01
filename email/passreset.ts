export function email(from: string, to: string, token: string) {
	return {
		from,
		to,
		subject: 'nerdou: redefinição de senha',
		text: `Utilize o token de segurança para redefinir sua senha: ${token}`,
		html: `<h1> nerdou </h1> <p> Utilize o token de segurança para redefinir sua senha: </p><p> ${token} </p>`,
	}
}

const passreset = { email }

export default passreset
