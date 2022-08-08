import express from 'express'

import { authentication as controller } from '../controllers/authentication'
import { NotAllowed } from '../controllers/error'
import { handler } from '../middlewares/authentication/verify'

const allow = 'GET'
export const verify = express.Router()
verify
	.route('/verify/:token')
	.get(handler, controller.get)
	.post(NotAllowed('POST (create) verify/:token is not allowed.', allow))
	.put(NotAllowed('PUT (replace) verify/:token is not allowed.', allow))
	.patch(NotAllowed('PATCH (modify) verify/:token is not allowed.', allow))
	.delete(NotAllowed('DELETE (remove) verify/:token is not allowed.', allow))

export default verify
