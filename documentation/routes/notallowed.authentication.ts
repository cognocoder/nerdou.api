/**
 * @swagger
 * /authentication:
 *   get:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     description: Verify an authentication token with a GET request to /authentication/{token}.
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
 *               reason: GET (read) authentication is not allowed.
 *               allow: POST, PUT, DELETE
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
 *               reason: PATCH (modify) authentication is not allowed.
 *               allow: POST, PUT, DELETE
 *
 * /authentication/{token}:
 *   post:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     description: Create an authentication token with a POST request to /authentication.
 *     parameters:
 *     - in: path
 *       name: token
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
 *               reason: POST (create) an authentication token is not allowed.
 *               allow: GET, PATCH
 *   put:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     parameters:
 *     - in: path
 *       name: token
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
 *               reason: PUT (replace) an authentication token is not allowed.
 *               allow: GET, PATCH
 *   patch:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     parameters:
 *     - in: path
 *       name: token
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
 *               reason: PATCH (modify) an authentication token is not allowed.
 *               allow: GET, PATCH
 *   delete:
 *     tags: [Not Allowed]
 *     summary: Method Not Allowed
 *     parameters:
 *     - in: path
 *       name: token
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
 *               reason: DELETE (remove) an authentication token is not allowed.
 *               allow: GET, PATCH
 */
