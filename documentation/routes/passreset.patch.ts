/**
 * @swagger
 * /passreset:
 *   patch:
 *     tags: [Passreset]
 *     summary: Reset a passhash from reset e-mail
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *             - token
 *             - passhash
 *             properties:
 *               token:
 *                 type: string
 *               passhash:
 *                 type: string
 *             example:
 *               token: XVUSaeGsUMJC/gScPImRoP5g
 *               passhash: testertester
 *     responses:
 *       '200':
 *         description: Ok
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_reset:
 *                 summary: The reset token is missing
 *                 value: { "code": 400, "status": "Bad Request", "reason": "The reset token is missing." }
 *               missing_password:
 *                 summary: The password is missing
 *                 value: { "code": 400, "status": "Bad Request", "reason": "The password is missing." }
 *               account_not_found:
 *                 summary: The account was not found
 *                 value: { "code": 400, "status": "Bad Request", "reason": "The account was not found." }
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_reset:
 *                 summary: The reset token is missing
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The reset token is missing." }
 *               invalid_reset:
 *                 summary: The access reset is invalid, expired or revoked
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The reset token is invalid, expired or revoked." }
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_email:
 *                 summary: The mailer configurations is missing
 *                 value: { "code": 500, "status": "Internal Server Error", "reason": "The mailer configuration is missing." }
 */
