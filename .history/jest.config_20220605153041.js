module.exports = {
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: [
      "<rootDir>/src/tests/setupTests.ts"
  ],
  transform: {
      "^.+\\.(js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: '@testing-library/jest-dom',
  moduleNameMapper: {
      "\\.(scss|css|sass)$": "identity-obj-proxy"
  }
};