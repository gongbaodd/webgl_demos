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
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text-summary", "clover"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./config/jest.js"],
  snapshotSerializers: ["enzyme-to-json/serializer"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.jest.json",
    },
  },
};
