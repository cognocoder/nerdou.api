import express from 'express'

import { authentication as controller } from '../controllers/authentication'
import { NotAllowed } from '../controllers/error'
import middlewares from '../middlewares/authentication'

const allow = 'GET'
export const token = express.Router()
token
	.route('/authentication/:token')
	.get(middlewares.verify, controller.get)
	.post(
		NotAllowed('POST (create) an authentication token is not allowed.', allow)
	)
	.put(
		NotAllowed('PUT (replace) an authentication token is not allowed.', allow)
	)
	.patch(
		NotAllowed('PATCH (modify) an authentication token is not allowed.', allow)
	)
	.delete(
		NotAllowed('DELETE (remove) an authentication token is not allowed.', allow)
	)

export default token
