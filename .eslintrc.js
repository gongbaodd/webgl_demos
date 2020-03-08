module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": ["off"],
    "import/extensions": ["off"],
    "@typescript-eslint/explicit-function-return-type": ["off"],
  },
  overrides: [
    {
      files: ["**/*.spec.ts", "**/*.spec.tsx"],
      rules: {
        "no-undef": ["off"],
        "import/first": ["off"],
      },
    },
  ],
};
