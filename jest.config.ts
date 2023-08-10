import type { Config } from 'jest'

const config: Config = {

  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  roots: ['<rootDir>/src']
}

export default config
