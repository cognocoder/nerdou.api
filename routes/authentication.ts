import express from 'express'

import authentication from '../controllers/authentication'
import { NotAllowed } from '../controllers/error'
import { local, bearer, refresh, verify } from '../middlewares/authentication'

const allow = 'POST, GET, PUT, DELETE'
const route = '/authentication'
const router = express.Router()
router
	.post(route, local, authentication.post)
	.get(`${route}/:token`, verify, authentication.get)
	.put(route, refresh, authentication.post)
	.patch(
		route,
		NotAllowed('PATCH (modify) authentication is not allowed.', allow)
	)
	.delete(route, [refresh, bearer], authentication.delete)

export default router
