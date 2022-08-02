/**
 * @swagger
 * /accounts:
 *   post:
 *     tags: [Accounts]
 *     summary: Create an account
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *           required: true
 *           example:
 *             email: tester@tester.test
 *             passhash: testerbot
 *             username: tester
 *     responses:
 *       '201':
 *         description: Account created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *             example:
 *               email: tester@tester.test
 *               passhash: 2a$12$cJx0VjHcndq1fb3EHOFGZOcbvfScM3yTS8LcvMnThqwBt57zBAQFy
 *               username: tester
 *               _id: 62e96d93428187ac34956f2b
 *               __v: 0
 *       '400':
 *         description: Account already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 400
 *               status: Bad Request
 *               reason: Account for e-mail tester@tester.test already exists
 *       '500':
 *         description: Missing mailer configuration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 500
 *               status: Internal Server Error
 *               reason: Missing mailer configuration
 */
