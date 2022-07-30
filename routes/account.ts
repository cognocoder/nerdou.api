import express from 'express'

import account from '../controllers/account'

import { local, bearer } from '../middlewares/authentication'

const router = express.Router()

router
	.post('/accounts/:id', account.post)
	.get('/accounts/:id', bearer, account.get)
	.put('/accounts/:id', account.put)
	.patch('/accounts/:id', bearer, account.patch)
	.delete('/accounts/:id', [bearer, local], account.delete)

export default router
