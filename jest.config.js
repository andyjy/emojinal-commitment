/*
 * We use Jest for JavaScript testing
 *
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  preset: "@andyjy/monorepo-utils",
  testPathIgnorePatterns: [
    // https://nextjs.org/docs/testing says: ['<rootDir>/node_modules/', '<rootDir>/.next/']
    "node_modules/",
    "dist/",
    ".next",
    "packages/conventional-changelog-emojionalcommits/",
  ],
};
