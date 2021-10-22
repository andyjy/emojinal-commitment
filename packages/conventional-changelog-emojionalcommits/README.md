## Emojional commits conventional-changelog preset

A fork of [conventional-changelog-conventionalcommits](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-conventionalcommits)@c35708d to support emojional commits.

Customisations implemented:

- [writer-opts.js](writer-opts.js): customised mapping of types -> changelog sections in function `defaultConfig()`
- [parser-opts.js](parser-opts.js): customised regexes to match `headerPattern` and `breakingHeaderPattern`
