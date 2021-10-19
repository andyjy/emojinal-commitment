# emojinal-commitment :heart:

Git commit-msg hook to automatically bring some emojion to commit messages.

Assumes [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
with commit types roughly based on (a subset of) the [Angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format).

## What it does

1. Rewrites (some) commit type prefixes to emoji:

> `fix: broken thing now works` -> `🐛 broken thing now works`

2. Inserts emoji to to illustrate type of (some) commits, even when not using conventional-commit `type:` prefix:

> `fix broken thing` -> `🐛 fix broken thing`

3. Rewrites `:emoji_shortcodes:` to unicode emoji characters (for nicer display in terminals too, e.g. `git log`)

> `initial commit :tada:` -> `initial commit 🎉 `

## Installation

```sh
npm install emojinal-commitment --save-dev

# configure git commit-msg hook to call `npx emojinal-commitment`
# ..here we use husky to manage git hooks:
npm install husky --save-dev
npm set-script prepare "husky install"
npm run prepare
# add the hook: (slightly complex to work around npx bug - see below)
npx --package=husky -c "husky add .husky/commit-msg 'npx emojinal-commitment \"\$1\"'"

# commit updated dev dependencies and the .husky/commit-msg git hook to your repo
git add .husky/commit-msg package*.json
git commit -m "build: process commit messages with emojinal-commitment"
# `emojinal-commitment` will run every time you commit
```

_At the time of writing, npx has a bug not passing through escaped command arguments - so we can't simply run `npx husky add commit-msg 'npx emojinal-commitment $1'`. See <https://github.com/typicode/husky/issues/1019>, <https://github.com/npm/cli/issues/3067>._

## Commit types supported - and emoji applied

> `<type>: commit message` -> `<emoji> commit message`

_Roughly based on (a subset of) the [Angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format) - although not every commit needs a `<type>:` prefix, and not every type prefix needs an emoji..<sup>[see philosophy, below](#philosophy)</sup>_

### Commits representing code changes

| Emoji |     Type prefix(es)     | Description                                               |
| :---: | :---------------------: | :-------------------------------------------------------- |
|  ✨   |    `feat` `feature`     | New feature                                               |
|  🐛   |          `fix`          | Bug fix                                                   |
|  🏎    |         `perf`          | A code change that improves performance                   |
|  ♻️   |       `refactor`        | A code change that neither fixes a bug nor adds a feature |
|  🚥   |     `test` `tests`      | Add or fix tests                                          |
|  💅   | `tidy` `polish` `style` | Tidy/prettify code                                        |

#### Other types of commits

| Emoji | Type prefix(es) | Description                                                   |
| :---: | :-------------: | :------------------------------------------------------------ |
|  📚   |  `docs` `doc`   | Documentation-only changes                                    |
|  🛠️   |     `build`     | Changes that affect the build system or external dependencies |
|  🤖   |      `ci`       | Changes to our CI configuration files and scripts             |

We intentionally avoid doing anything for other commit types - see below. _Not every commit needs an emoji.._

## Philosophy

- **Commit history that's fun/pleasing to inspect, _and_ benefits from enhanced ease/speed of interpretation/skimming.**
  - We're primarily concerned with the apearance of a _list of commits_ - inspecting single commit typically comes with a bunch more context that we're aware of/paying attention to beyond just the commit message
- **Use emoji to add some fun / colour - but also add meaning.** Avoid additional cruft in commit messages that serves no purpose or causes confusion. In particular we keep the number of emoji/commit types low - and don't feel the need to annotate every single commit.
  - Opinion: the [Angular convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format) of type prefixes for _every_ commit introduces too much cruft that often doesn’t enhance the meaning of the commit message, while breaking the left-alignment of the actual message content - inhibiting easy scanning of a commit history.
  - Emoji replacing type prefixes solves the left-alignment problem, while significantly reducing the total character count for much improved scanning.
- **Emoji add emphasis - not every commit needs to be highlighted with one.** _(In fact we try to use as few as possible so the ones we do use stand out better.)_
  - We intentionally avoid doing anything for:
    - `chore:` - should be of little significance, not something to draw attention to while reviewing historic commits. _Encourage the use of more descriptive types - or simply no type prefix for small things. (Just describe the change, don’t need make a big deal of it - it’s an advantage to make it appear of secondary importance in the commit history)._
    - **Releases** - just commit with version label, including “v” prefix: `vX.X.X`. _Self-explanatory, no additional annotation required._
    - **Merge commits** - generally aim to squash-and-merge, picking a descriptive type (`feat|fix|refactor..`). If doing a merge commit (`--no-ff`), stick with standard GitHub convention `Merge pull request #xx from <repo/branch>`. _(The story will be told by the individual commits and their commit messages, which is where we wish to draw attention.)_
    - **Reverts** - generally stick with standard git convention `Revert ‘<original commit id>’` - a revert typically represents a small step backwards. If we're reverting a significant feature/behaviour, we'd expect to see an appropriately descriptive commit message - the revert itself is likely a (temporary) `🐛 fix:`..
  - The presence of some emoji draw quick attention to more significant commits - features, fixes, tests, docs, refactoring[^1], meta-changes not regarding app itself (build/ci).

**Finally - to be used by people with a healthy disregard for rules(!)** If you wish to sprinkle your commits with emoji on occasion, this package isn't here to police that.. (that's why we also rewrite `:shortcodes:` and provide flexibility when no `<type>:` prefix is given). But do try to use sparingly, appreciating the intent of [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) and the philosophy above.. :wink:

[^1]: Of note, “refactoring” describes more than just cutting/pasting code around - it also encompasses many implementation changes (that don’t affect external behaviour) - e.g. underlying algorithm changes or rewrites. “Refactoring is intended to improve the design, structure, and/or implementation” - https://en.wikipedia.org/wiki/Code_refactoring

## Implementation notes

- We pad emoji with `en-space` characters to provide pleasing visual spacing when displayed on GitHub etc
