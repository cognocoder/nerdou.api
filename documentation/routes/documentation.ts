/**
 * @swagger
 * /:
 *   get:
 *     tags: [Documentation]
 *     summary: Redirects to the documentation page
 *     responses:
 *       '302':
 *         description: Redirects to the documentation page.
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
