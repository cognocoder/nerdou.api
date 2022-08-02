import express from 'express'
import { NotAllowed } from '../controllers/error'

const allow = 'GET'
const router = express.Router()
router
	.route('/documentation')
	.post(NotAllowed('POST (create) documentation in not allowed.', allow))
	.put(NotAllowed('PUT (replace) documentation in not allowed.', allow))
	.patch(NotAllowed('PATCH (modify) documentation in not allowed.', allow))
	.delete(NotAllowed('DELETE (remove) documentation in not allowed.', allow))

export default router
