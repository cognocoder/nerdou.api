/**
 * @swagger
 * /documentation:
 *   post:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     responses:
 *       '405':
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 405
 *               status: Method Not Allowed
 *               reason: POST (create) documentation is not allowed.
 *               allow: GET
 *   put:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     responses:
 *       '405':
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 405
 *               status: Method Not Allowed
 *               reason: PUT (replace) documentation is not allowed.
 *               allow: GET
 *   patch:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     responses:
 *       '405':
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 405
 *               status: Method Not Allowed
 *               reason: PATCH (modify) documentation is not allowed.
 *               allow: GET
 *   delete:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     responses:
 *       '405':
 *         description: Method Not Allowed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 405
 *               status: Method Not Allowed
 *               reason: DELETE (remove) documentation is not allowed.
 *               allow: GET
 */
