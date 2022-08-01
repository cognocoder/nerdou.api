import express from 'express'

import passreset from '../controllers/passreset'

const router = express.Router()

router
	.post('/passreset', passreset.post)
	.get('/passreset', passreset.get)
	.put('/passreset', passreset.post)
	.patch('/passreset', passreset.patch)
	.delete('/passreset', passreset.delete)

export default router
