/**
 * @swagger
 * /:
 *   get:
 *     tags: [Documentation]
 *     responses:
 *       '302':
 *         description: Redirects the to documentation page.
 *         headers:
 *           Location:
 *             type: string
 *             description: /documentation
 *
 * /documentation:
 *   get:
 *     tags: [Documentation]
 *     summary: The nerdou OpenAPI documentation
 *     responses:
 *       '200':
 *         description: Documentation page.
 */
