import { NextFunction, Request, Response } from 'express'
import bcryptjs from 'bcryptjs'

import Account from '../models/Account'
import { ResetToken } from '../tokens/opaque'
import mailer from '../email'
import { email as resetmail } from '../email/passreset'
import {
	BadRequest,
	InternalServerError,
	MethodNotAllowed,
} from '../errors/HttpErrors'

const allow = 'POST, PATCH'

const passreset = {
	/**
	 * Create a reset token and send it by e-mail for passhash reset.
	 */
	post: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			const { email } = request.body
			if (!email?.length) {
				throw new BadRequest('The request e-mail property is missing.')
			}

			const account = await Account.findOne({ email }).exec()
			if (!account) {
				throw new BadRequest(`The account for e-mail ${email} was not found.`)
			}

			const token = await ResetToken.create(account.id)
			const config = await mailer.config()
			if (!config.auth.user) {
				throw new InternalServerError('Missing mailer configuration.')
			}

			const mail = resetmail(config.auth.user, email, token)
			await mailer.send(config, mail)

			return res.status(204).end()
		} catch (error) {
			if (error instanceof BadRequest) {
				return res.status(204).end()
			}
			return next(error)
		}
	},

	/**
	 * (405) Method Not Allowed.
	 */
	get: (req: Request, res: Response, next: NextFunction) => {
		throw new MethodNotAllowed('Get (read) passreset is not allowed.', allow)
	},

	/**
	 * (405) Method Not Allowed.
	 */
	put: (req: Request, res: Response) => {
		throw new MethodNotAllowed('PUT (replace) passreset is not allowed.', allow)
	},

	/**
	 * Redefine account passhash.
	 */
	patch: async (req: Request, res: Response, next: NextFunction) => {
		try {
			const request = req as any
			const { token, passhash } = request.body
			if (!token?.length) {
				throw new BadRequest('The reset token is invalid.')
			}
			if (!passhash?.length) {
				throw new BadRequest('The new password is missing.')
			}

			const id = await ResetToken.verify(token)
			const account = await Account.findById(id).exec()
			if (!account) {
				throw new BadRequest(`The account ${id} was not found.`)
			}

			account.passhash = await bcryptjs.hash(passhash, 12)
			await account.save()

			return res.status(200).json(account)
		} catch (error) {
			return next(error)
		}
	},

	/**
	 * (405) Method Not Allowed.
	 */
	delete: (req: Request, res: Response) => {
		throw new MethodNotAllowed(
			'DELETE (remove) passreset is not allowed.',
			allow
		)
	},
}

export default passreset
