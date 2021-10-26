// We're using ESLint for linting:
//  - JavaScript (as designed)
//  - TypeScript (via typescript-eslint <- eslint-config-next <- next/core-web-vitals)

module.exports = {
  extends: "@andyjy/monorepo-utils",
  rules: {
    "@next/next/no-html-link-for-pages": ["error", "./"],
  },
};
