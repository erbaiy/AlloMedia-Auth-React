module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',  // Ensure all JS files are handled
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!your-esm-package)/', // Add packages that use ESM, e.g., axios
  ],
};
