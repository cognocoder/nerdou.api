import express from 'express'

import accounts from '../controllers/accounts'

import { bearer } from '../middlewares/authentication'

const router = express.Router()

router
	.post('/accounts', accounts.post)
	.get('/accounts', bearer, accounts.get)
	.put('/accounts', accounts.put)
	.patch('/accounts', accounts.patch)
	.delete('/accounts', accounts.delete)

export default router
