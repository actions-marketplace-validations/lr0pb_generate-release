module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // moduleNameMapper: {
  //   '^@/(.*)$': '<rootDir>/src/$1',
  // },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  testMatch: [
    '**/__tests__/**/*.test.(ts|tsx)', '!**/__tests__/**/*.disabled.test.(ts|tsx)'
  ],
  // collectCoverageFrom: [
  //   'src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/**/index.ts'
  // ],
  // coverageDirectory: 'coverage',
  // coverageReporters: ['json-summary', 'text', 'lcov'],
};
