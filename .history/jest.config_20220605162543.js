module.exports = {
    testEnvironment: "jsdom",
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.ts"],
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    },
  };