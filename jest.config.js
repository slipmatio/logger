module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text-summary', 'cobertura'],
  testMatch: ['<rootDir>/tests/unit/**/*.spec.ts'],
  globals: {
    __DEV__: true,
    __BROWSER__: true,
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  testURL: 'http://localhost/',
}
