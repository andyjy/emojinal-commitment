module.exports = {
  // for staged changes to files:

  // - run type-check on typescript
  "**/*.ts?(x)": (filenames) =>
    `bin/tsc-lint-staged ${filenames
      .map((file) => "'" + file.replace("'", "?") + "'")
      .join(" ")}`,

  // - lint/fix typescript/javascript (with eslint)
  "**/*.(ts|js)?(x)": (filenames) => [
    // [hack]: running `next lint` from root level even though root isn't a nextjs project
    //         => we need to temporarily fake a /pages directory to avoid bugout
    "touch pages",
    `npx next lint --fix --file ${filenames
      .map((file) => "'" + file.replace("'", "?") + "'")
      .join(" --file ")}`,
    "bash -c '[ -f pages ] && ([ -s pages ] || rm pages )'",
  ],

  // - format everything with prettier (excluding .prettierignore matches)
  "**.*": (filenames) =>
    `prettier --write --ignore-unknown ${filenames
      .map((file) => "'" + file.replace("'", "?") + "'")
      .join(" ")}`,
};
