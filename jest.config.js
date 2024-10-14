export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': 'babel-jest',
  },
  
  setupFilesAfterEnv: ['./src/setupTests.js'],
  transformIgnorePatterns: [
    './node_modules/(?!axios)/', // Add your ESM packages here
  ],
  extensionsToTreatAsEsm: [], // Removed '.js' as it's inferred automatically
};