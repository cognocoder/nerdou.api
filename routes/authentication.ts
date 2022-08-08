import express from 'express'

import { authentication as controller } from '../controllers/authentication'
import { NotAllowed } from '../controllers/error'
import { handler as local } from '../middlewares/authentication/local'
import { handler as bearer } from '../middlewares/authentication/bearer'
import { handler as refresh } from '../middlewares/authentication/refresh'

const allow = 'POST, PUT, DELETE'
export const authentication = express.Router()
authentication
	.route('/authentication')
	.post(local, controller.update)
	.put(refresh, controller.update)
	.delete([refresh, bearer], controller.delete)
	.patch(NotAllowed('PATCH (modify) authentication is not allowed.', allow))
	.get(NotAllowed('GET (read) authentication is not allowed.', allow))

export default authentication
