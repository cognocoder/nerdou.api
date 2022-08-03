import express from 'express'

import authentication from '../controllers/authentication'
import { NotAllowed } from '../controllers/error'
import { local, bearer, refresh, verify } from '../middlewares/authentication'

const allow = 'POST, PUT, DELETE'
const allow_token = 'GET'
const route = '/authentication'
const router = express.Router()
router
	.post(route, local, authentication.post)
	.put(route, refresh, authentication.post)
	.delete(route, [refresh, bearer], authentication.delete)
	.patch(
		route,
		NotAllowed('PATCH (modify) authentication is not allowed.', allow)
	)
	.get(route, NotAllowed('GET (read) authentication is not allowed.', allow))

	.get(`${route}/:token`, verify, authentication.get)
	.post(
		`${route}/:token`,
		NotAllowed(
			'POST (create) an authentication token is not allowed.',
			allow_token
		)
	)
	.put(
		`${route}/:token`,
		NotAllowed(
			'PUT (replace) an authentication token is not allowed.',
			allow_token
		)
	)
	.patch(
		`${route}/:token`,
		NotAllowed(
			'PATCH (modify) an authentication token is not allowed.',
			allow_token
		)
	)
	.delete(
		`${route}/:token`,
		NotAllowed(
			'DELETE (remove) an authentication token is not allowed.',
			allow_token
		)
	)

export default router
