const path = require("path");

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    project: path.join(__dirname, "./tsconfig.json"),
  },
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  plugins: ["@typescript-eslint", "jest", "promise", "unicorn"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:promise/recommended",
    "plugin:unicorn/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "prettier/prettier": "warn",
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    "no-prototype-builtins": "off",
    // Not needed to restrict for Fontsource build scripts
    "no-console": "off",
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    "import/prefer-default-export": "off",
    "import/no-default-export": "error",
    // Allow most functions to rely on type inference. If the function is exported, then `@typescript-eslint/explicit-module-boundary-types` will ensure it's typed.
    "@typescript-eslint/explicit-function-return-type": "off",
    // Only supported in Node 16.x and up
    "unicorn/prefer-node-protocol": "off",
    // Common abbreviations are known and readable
    "unicorn/prevent-abbreviations": "off",
    // Airbnb prefers forEach
    "unicorn/no-array-for-each": "off",
    // It's not accurate in the monorepo style
    "import/no-extraneous-dependencies": "off",
    // Fontsource doesn't need to worry about heavyweight libraries
    "no-restricted-syntax": "off",
  },
};