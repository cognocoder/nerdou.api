import express from 'express'

import authentication from '../controllers/authentication'

import { local, bearer } from '../middlewares/authentication'

const router = express.Router()

router
	.post('/authentication', local, authentication.post)
	.get('/authentication', authentication.get)
	.put('/authentication', authentication.put)
	.patch('/authentication', authentication.patch)
	.delete('/authentication', bearer, authentication.delete)

export default router
