/**
 * @swagger
 * /notfound:
 *   put:
 *     tags: [Not Found]
 *     summary: Not Found
 *     description: Default response for a resource or service not found. Please note that /notfound is provided as an example
 *     responses:
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 404
 *               status: Not found
 *               reason: Route (resource or service) not found.
 */
