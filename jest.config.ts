/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

import { defaults } from 'jest-config'

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFilesAfterEnv: ['./jest.setup.ts'],
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	slowTestThreshold: 60,
	testTimeout: 10000,
}
