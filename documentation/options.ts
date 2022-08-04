const options = {
	swaggerDefinition: {
		openapi: '3.0.3',
		info: {
			title: 'nerdou',
			version: '1.0.0',
			description: 'The nerdou OpenAPI documentation',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			contact: {
				name: 'Breno Souza',
				url: 'https://nerdou.com.br',
				email: 'cognocoder@gmail.com',
			},
		},
		servers: [
			{
				url: 'http://localhost:6000',
				description: 'Development',
			},
			{
				url: 'https://api.nerdou.com.br',
				description: 'Production',
			},
		],
	},
	apis: [
		'./documentation/tags.yaml',
		'./documentation/components/*.yaml',
		'./documentation/routes/*.yaml',
		'./documentation/schemas/*.yaml',
	],
}

export default options
