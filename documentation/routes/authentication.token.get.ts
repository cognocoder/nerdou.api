/**
 * @swagger
 * /authetication/{token}:
 *   get:
 *     tags: [Authentication]
 *     summary: Verify an account
 *     description: Verify an account using a Json Web Token.
 *     parameters:
 *     - in: path
 *       name: token
 *       required: true
 *       schema:
 *         $ref: '#/components/schemas/VerifyToken'
 *     responses:
 *       '200':
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *             example:
 *               _id: 62e96d93428187ac34956f2b
 *               email: tester@tester.test
 *               passhash: $2a$12$cJx0VjHcndq1fb3EHOFGZOcbvfScM3yTS8LcvMnThqwBt57zBAQFy
 *               username: testerbot
 *               verified: 2022-08-01T14:09:07.526Z
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               status: Bad Request
 *               reason: Account was not verified.
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               status: Unauthorized
 *               reason: The account was not found.
 */
