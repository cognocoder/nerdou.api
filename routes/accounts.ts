import express from 'express'

import accounts from '../controllers/accounts'
import { bearer } from '../middlewares/authentication'
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
