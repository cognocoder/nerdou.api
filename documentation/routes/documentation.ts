/**
 * @swagger
 * tags:
 *   name: Documentation
 *
 * /:
 *   get:
 *     tags: [Documentation]
 *     responses:
 *       '302':
 *         description: Redirects the to documentation page.
 *         headers:
 *           Location:
 *             type: string
 *             description: Resource location (/documentation)
 *
 * /documentation:
 *   get:
 *     tags: [Documentation]
 *     summary: The nerdou OpenAPI documentation
 *     responses:
 *       '200':
 *         description: Documentation page.
 */
