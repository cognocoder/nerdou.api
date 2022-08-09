import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'

import Account from '../models/Account'
import { BadRequest, InternalServerError } from '../errors/HttpErrors'

import { VerifyToken } from '../tokens/jwt'
import mailer from '../email'
import verification from '../email/verification'

export const accounts = {
	/**
	 * Create an account with an access and a refresh token, sends a
	 * verification e-mail.
	 */
	post: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const acc = new Account(req.body)
			const found = await Account.findOne({ email: acc.email })
			if (found) {
				throw new BadRequest(`Account for e-mail ${acc.email} already exists.`)
			}

			await acc.validate()
			acc.passhash = await bcryptjs.hash(acc.passhash, 12)
			const saved = await acc.save()

			const token = VerifyToken.create(acc.id)
			const address = verification.address(token)
			const config = await mailer.config()
			if (!config.auth.user) {
				throw new InternalServerError('Missing mailer configuration.')
			}

			const email = verification.email(config.auth.user, acc.email, address)
			await mailer.send(config, email)

			return res.status(201).json(saved)
		} catch (error) {
			return next(error)
		}
	},

	/**
	 * Get accounts.
	 */
	get: async (req: Request, res: Response) => {
		const accounts = await Account.find().exec()
		return res.status(200).json(accounts)
	},
}

export default accounts
