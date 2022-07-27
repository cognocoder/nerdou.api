import express from 'express'

import account from '../controllers/account'

const router = express.Router()

router
	.post('/accounts/:id', account.post)
	.get('/accounts/:id', account.get)
	.put('/accounts/:id', account.put)
	.patch('/accounts/:id', account.patch)
	.delete('/accounts/:id', account.delete)

export default router
