// we use https://www.npmjs.com/package/lint-staged
// to lint & typecheck staged files on (before) commit
var config = require("@andyjy/monorepo-utils/lint-staged.config");
module.exports = config;
