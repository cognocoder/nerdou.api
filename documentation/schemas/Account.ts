/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *       - email
 *       - passhash
 *       properties:
 *         email:
 *           type: string
 *           description: The account e-mail.
 *           pattern: ^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$
 *         passhash:
 *           type: string
 *           pattern: ^.{8,}$
 *         username:
 *           type: string
 *           pattern: ^.{2,}$
 *         verified:
 *           type: string
 *           format: date
 *       example:
 *         email: tester@tester.test
 *         passhash: testerbot
 *         username: tester
 */
