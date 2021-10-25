import fs from "fs";
import { nameToEmoji } from "gemoji";

type EmojionalConfigType = {
  type: string | [string];
  emoji: string;
};

export default function emojionalCommitment(msg: string): string {
  return msg
    .replace(typeMatch, typeReplacement)
    .replace(noTypeMatch, noTypeReplacement)
    .replace(shortcodeMatch, shortcodeReplacement);
}

const rules = JSON.parse(
  fs.readFileSync(new URL("../rules.json", import.meta.url), {
    encoding: "utf8",
  })
);
const types = rules.types.map((type: EmojionalConfigType) => type.type).flat();

/* the following non-literal regexes (i.e. computed) don't include user-submitted input, so we're ok */
/* eslint-disable security-node/non-literal-reg-expr */
const typeMatch = new RegExp("^(" + types.join("|") + ")(!?)([:([]) ?", "i");
const noTypeMatch = new RegExp("^(" + types.join("|") + ") ", "i");
/* eslint-enable security-node/non-literal-reg-expr */
const shortcodeMatch = / ?:([a-z_]+): ?/gi;

function typeReplacement(match: string, p1: string, p2: string, p3: string) {
  const rule = getTypeRule(p1);
  if (!rule) {
    return match;
  }
  return (
    rule.emoji +
    "\u2002" +
    (p2 == "!" ? rules.breaking + "\u2002" : "") +
    (p3 == ":" ? "" : p3)
  );
}

function noTypeReplacement(match: string, p1: string) {
  const rule = getTypeRule(p1);
  if (!rule) {
    return match;
  }
  return rule.emoji + "\u2002" + match;
}

function shortcodeReplacement(match: string, p1: string) {
  return (nameToEmoji as { [index: string]: string })[p1]
    ? "\u2002" + (nameToEmoji as { [index: string]: string })[p1] + "\u2002"
    : match;
}

function getTypeRule(type: string) {
  for (const rule of rules.types) {
    if ((Array.isArray(rule.type) ? rule.type : [rule.type]).includes(type)) {
      return rule;
    }
  }
}
