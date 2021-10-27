## Emojional commits conventional-changelog preset

A fork of [conventional-changelog-conventionalcommits](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-conventionalcommits)[^1] to generate [Conventional Changelogs](https://github.com/conventional-changelog/conventional-changelog) from repos using [emojional commits](https://www.npmjs.com/package/emojional-commitment) (as implemented by the [emojional-commitment](https://www.npmjs.com/package/emojional-commitment) git commit-msg hook).

_Customisations implemented:_

- [writer-opts.js](writer-opts.js): customised mapping of types -> changelog sections in function `defaultConfig()`
- [parser-opts.js](parser-opts.js): customised regexes to match `headerPattern` and `breakingHeaderPattern`

[^1]: @ c35708d
