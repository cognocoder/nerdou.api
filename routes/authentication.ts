import express from 'express'

import authentication from '../controllers/authentication'

import { local, bearer, refresh, verify } from '../middlewares/authentication'

const router = express.Router()

router
	// Create a bearer json web token
	.post('/authentication', local, authentication.post)
	// Verify a given token
	.get('/authentication/:token', verify, authentication.get)
	// Create new bearer and refresh tokens
	.put('/authentication', refresh, authentication.post)
	// Method Not Allowed
	.patch('/authentication', authentication.patch)
	// Revoke refresh and bearer tokens
	.delete('/authentication', [refresh, bearer], authentication.delete)

export default router
