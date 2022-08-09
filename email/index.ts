import nodemailer, { SendMailOptions } from 'nodemailer'

export interface EmailConfig {
	host?: string
	auth: {
		user?: string
		pass?: string
	}
	secure?: boolean
}

export async function config() {
	const config: EmailConfig = {
		host: process.env.EMAIL_HOST,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		secure: true,
	}

	if (!config.host || !config.auth.user?.length || !config.auth.pass?.length) {
		throw new Error(`Missing mailer configuration.`)
	}

	if (process.env.NODE_ENV === 'production') {
		return config
	}

	config.secure = false

	const auth = await nodemailer.createTestAccount()
	config.host = 'smtp.ethereal.email'
	config.auth = auth
	return config
}

export async function send(config: EmailConfig, options: SendMailOptions) {
	const transporter = nodemailer.createTransport(config)
	const sent = await transporter.sendMail(options)

	if (process.env.NODE_ENV === 'production') {
		return
	}

	console.log(`Mailer @ ${nodemailer.getTestMessageUrl(sent)}`)
}

const mailer = { config, send }

export default mailer
