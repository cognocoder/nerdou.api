import express from 'express'

import accounts from '../controllers/accounts'
import { handler as bearer } from '../middlewares/authentication/bearer'
import { NotAllowed } from '../controllers/error'

const allow = 'POST, GET'
const router = express.Router()
router
	.route('/accounts')
	.post(accounts.post)
	.get(bearer, accounts.get)
	.put(NotAllowed('PUT (replace) accounts is not allowed.', allow))
	.patch(NotAllowed('PATCH (modify) accounts is not allowed.', allow))
	.delete(NotAllowed('DELETE (remove) accounts is not allowed.', allow))

export default router
