import express from 'express'

import { authentication as controller } from '../controllers/authentication'
import { NotAllowed } from '../controllers/error'
import middlewares from '../middlewares/authentication'

const allow = 'POST, PUT, DELETE'
export const base = express.Router()
base
	.route('/authentication')
	.post(middlewares.local, controller.update)
	.put(middlewares.refresh, controller.update)
	.delete([middlewares.refresh, middlewares.bearer], controller.delete)
	.patch(NotAllowed('PATCH (modify) authentication is not allowed.', allow))
	.get(NotAllowed('GET (read) authentication is not allowed.', allow))

export default base
