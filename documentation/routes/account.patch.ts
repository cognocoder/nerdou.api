/**
 * @swagger
 * /accounts/{id}:
 *   patch:
 *     tags: [Account]
 *     summary: Modify an account
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *     requestBody:
 *       description: Properties to be updated
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *           example:
 *             username: tester
 *     responses:
 *       '200':
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               account_not_found:
 *                 summary: The account was not found
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The account was not found." }
 *               missing_access:
 *                 summary: The access token is missing
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The access token is missing." }
 *               invalid_access:
 *                 summary: The access token is invalid, expired or revoked
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The access token is invalid, expired or revoked." }
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               account_not_found:
 *                 summary: The account was not found
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The account was not found." }
 *     security:
 *     - bearer: []
 */
