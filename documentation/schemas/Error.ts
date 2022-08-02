/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         code:
 *           type: integer
 *           description: HTTP error response status code
 *         status:
 *           type: string
 *           description: HTTP error response status
 *         reason:
 *           type: string
 *           description: HTTP error response reason
 *       example:
 *         code: 400
 *         status: Bad Request
 *         reason: Account for given e-mail already exists
 */
