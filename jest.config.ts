import type { Config } from 'jest'

const config: Config = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  setupFiles: ['jest-plugin-context/setup'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', 'dist'],
  rootDir: '.',
  transform: {
    '^.+\\.ts?$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**'],
  roots: ['<rootDir>/'],
  coverageDirectory: '../coverage',
};

export default config
