# Emojinal-commitment

Git commit-msg hook to automatically bring some emojion to commit messages.

Assumes [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)
with commit types roughly based on the [Angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)

## What it does

1. rewrites (some) commit type prefixes to emoji

> "fix: broken thing now works" -> "🐛 : broken thing now works"

2. inserts emoji to to illustrate type of (some) commits even when not using conventional-commit type: prefix

> "fix broken thing" -> "🐛  fix broken thing"

3. rewrites :emoji_shortcodes: to unicode emoji characters
   (for nicer display outside shells)

> "initial commit :tada:" -> "initial commit 🎉 "

## Commit types - and chosen emoji:

> <type>: short message

- Code changes:
  - ✨  feat | feature: A new feature
  - 🐛  fix: A bug fix
  - 🏎  perf: A code change that improves performance
  - ♻️  refactor: A code change that neither fixes a bug nor adds a feature
  - 🚥  test: Add or fix tests
  - 💅  tidy | style: Tidy/prettify code
- Meta changes:
  - 📚  docs: Documentation only changes
  - 🛠️  build: Changes that affect the build system or external dependencies
  - 🤖  ci: Changes to our CI configuration files and scripts

We intentionally omit doing anything to:

- chore

## Philosophy

- Produce commit logs that look nice/fun AND are easy to read/skim
- ..Primarily concerned with the apearance of logs/stream of commits: when looking at a single commit we have much more context than just the commit message
- Emoji to add some fun / colour - but also add meaning. Don’t wish to add noise that serves no purpose or adds confusion.
- Believe the Angular convention of type prefixes for every commit introduces lots of cruft that often doesn’t enhance the meaning of the commit message, while breaking the left-alignment of the actual commit messages thus inhibiting easy scanning of a commit log.
  - => emoji solve the left-alignment problem and significantly reduce total # chars, for much improved scanning
- Emoji add emphasis - not every commit needs an emoji
  - Choose no emoji/prefix for chore - encourage more descriptive types, and genuinely just a small chore then no prefix required - just describe the change, don’t need make a big deal of it, it’s an advantage to make it appear of secondary importance in the commit log
- Instead, use to draw quick attention to more significant commits - features, fixes, tests, docs, refactoring, meta-changes not regarding app itself (build/ci
- Drop perf - is overlapping, either a feature (big improvement), fix (was hurting before) or refactor (small improvement, no change in functionality)
  - [n] “Refactoring” encompasses implementation changes (that don’t affect external behaviour) - not just moving code to different places or arranging it in a different way. “Refactoring is intended to improve the design, structure, and/or implementation” - https://en.wikipedia.org/wiki/Code_refactoring
- Few emoji/prefixes as possible
- To be used by people with a healthy disregard for rules
  - If you want to add your own emoji on occasion then go for it.. just try to use sparingly, appreciating the intent of the above
  - Flexible e.g. if no strict type: prefix given

Things we don't give emoji for:

- Other commit types with no prefix:
  - Chore: just adds noise. Just describe the chore without prefix.
  - Releases: just commit with version label including “v” prefix - “vX.X.X”. Self-explanatory, no additional annotation required.
  - Reverts: stick with standard git convention “Revert ‘<original commit name>’” - generally represents a step back, intentionally exclude emoji prefix to display as secondary importance.
  - Merge commits: generally aim to squash-and-merge, picking a descriptive type (feat/fix/refactor..). If doing a merge commit, stick with standard GitHub convention “Merge pull request #xx from repo/branch”

## Implementation notes

- We add an en-space after each emoji for improved visual appearance on GitHub etc (the following character can run into the emoji when separated by just a normal space char)
  - (just a normal space when the emoji is immediately followed by a colon)
