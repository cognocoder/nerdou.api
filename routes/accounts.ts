import express from 'express'

import accounts from '../controllers/accounts'

const router = express.Router()

router
	.post('/accounts', accounts.post)
	.get('/accounts', accounts.get)
	.put('/accounts', accounts.put)
	.patch('/accounts', accounts.patch)
	.delete('/accounts', accounts.delete)

export default router
