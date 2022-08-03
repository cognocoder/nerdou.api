/**
 * @swagger
 * /authentication:
 *   post:
 *     tags: [Authentication]
 *     summary: Create access and refresh tokens
 *     requestBody:
 *       description: Refresh Token - Opaque Token
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LocalStrategy'
 *           example:
 *             username: tester@tester.test
 *             password: testerbot
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
 *               missing_user_credentials:
 *                 summary: The user credentials are missing
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "The user credentials are missing." }
 *               wrong_user_credentials:
 *                 summary: Could not authenticate account with given credentials
 *                 value: { "code": 401, "status": "Unauthorized", "reason": "Could not authenticate account tester@tester.test with given credentials." }
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
 */
