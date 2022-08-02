import express from 'express'

import account from '../controllers/account'
import { local, bearer } from '../middlewares/authentication'
import { NotAllowed } from '../controllers/error'

const allow = 'GET, PATCH, DELETE'
const router = express.Router()
router
	.route('/accounts/:id')
	.get(bearer, account.get)
	.patch(bearer, account.patch)
	.delete([bearer, local], account.delete)
	.post(NotAllowed('POST (create) account is not allowed.', allow))
	.put(NotAllowed('PUT (replace) account is not allowed.', allow))

export default router
