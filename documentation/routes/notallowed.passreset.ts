/**
 * @swagger
 * /passreset:
 *   get:
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
 *               reason: GET (read) passreset is not allowed.
 *               allow: POST, PATCH
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
 *               reason: PUT (replace) passreset is not allowed.
 *               allow: POST, PATCH
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
 *               allow: POST, PATCH
 */
