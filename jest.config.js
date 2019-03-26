module.exports = {
  verbose: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  coveragePathIgnorePatterns: ['/src/(index|App)\\.tsx/'],
  testRegex: '.*(\\.|/)test\\.(ts|tsx|js)$',
  setupFiles: ['./src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
}
