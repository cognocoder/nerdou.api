import express from 'express'

import authentication from '../controllers/authentication'

import { local, bearer, refresh, verify } from '../middlewares/authentication'

const router = express.Router()

router
	.post('/authentication', local, authentication.post)
	.get('/authentication/:token', verify, authentication.get)
	.put('/authentication', refresh, authentication.post)
	.patch('/authentication', authentication.patch)
	.delete('/authentication', [refresh, bearer], authentication.delete)

export default router
