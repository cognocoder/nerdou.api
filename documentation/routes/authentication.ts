/**
 * @swagger
 * /authentication:
 *   delete:
 *     tags: [Authentication]
 *     summary: Revoke access and refresh tokens
 *     description:
 *     parameters:
 *     - in: header
 *       name: Authorization
 *       required: true
 *       description: Access Token - Bearer Json Web Token
 *       schema:
 *         $ref: '#/components/schemas/AccessToken'
 *     requestBody:
 *       description: Refresh Token - Opaque Token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *     responses:
 *       '204':
 *         description: No Content
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               missing_refresh:
 *                 summary: The refresh token is missing
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The refresh token is missing." }
 *               invalid_refresh:
 *                 summary: The refresh token is invalid, expired or revoked
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The refresh token is invalid, expired or revoked." }
 *               missing_access:
 *                 summary: The access token is missing
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The access token is missing." }
 *               invalid_access:
 *                 summary: The access token is invalid, expired or revoked
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The access token is invalid, expired or revoked." }
 *     security:
 *     - bearer: []
 */
