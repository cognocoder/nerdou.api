/**
 * @swagger
 * /authentication:
 *   put:
 *     tags: [Authentication]
 *     summary: Update access and refresh tokens
 *     requestBody:
 *       description: Refresh Token - Opaque Token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefreshToken'
 *           example:
 *             refresh: mJXTE/UFJu+/sJ5UrNr6YNvu
 *     responses:
 *       '200':
 *         description: Ok
 *         headers:
 *           Authorization:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefreshToken'
 *             example:
 *               refresh: XVUSaeGsUMJC/gScPImRoP5g
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
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             examples:
 *               create_token:
 *                 summary: Could not create opaque token
 *                 value: { "code": 500, "status": "Internal Server Error", "reason": "Could not create opaque token." }
 *     security:
 *     - bearer: []
 */
