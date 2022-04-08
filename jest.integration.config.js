/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(integration).(spec|test).[jt]s?(x)" ],
  verbose: true
};