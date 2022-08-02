import express from 'express'

import passreset from '../controllers/passreset'
import { NotAllowed } from '../controllers/error'

const allow = 'POST, PATCH'
const router = express.Router()
router
	.route('/passreset')
	.post(passreset.post)
	.patch(passreset.patch)
	.get(NotAllowed('Get (read) passreset is not allowed.', allow))
	.put(NotAllowed('PUT (replace) passreset is not allowed.', allow))
	.delete(NotAllowed('DELETE (remove) passreset is not allowed.', allow))

export default router
