/**
 * @swagger
 * /accounts/{id}:
 *   post:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     description: Create an account with a POST request to /accounts.
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
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
 *               reason: POST (create) an account is not allowed.
 *               allow: GET, PATCH, DELETE
 *   put:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
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
 *               reason: PUT (replace) an account is not allowed.
 *               allow: GET, PATCH, DELETE
 */
