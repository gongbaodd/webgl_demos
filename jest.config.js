module.exports = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "components/*.ts",
    "components/*.js",
    "pages/*.ts",
    "pages/*.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text-summary", "clover"],
  testEnvironment: "node",
  testMatch: ["<rootDir>/src/**/__tests__/*.spec.ts"],
  setupFilesAfterEnv: ["./config/jest.js"],
};
