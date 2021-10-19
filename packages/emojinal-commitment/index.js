import fs from "fs";
import { nameToEmoji } from "gemoji";

export default function emojinalCommitment(msg) {
  return msg
    .replace(typeMatch, typeReplacement)
    .replace(noTypeMatch, noTypeReplacement)
    .replace(shortcodeMatch, shortcodeReplacement);
}

const rules = JSON.parse(
  fs.readFileSync(new URL("./rules.json", import.meta.url))
);
const types = rules.types.map((type) => type.type).flat();

const typeMatch = new RegExp("^(" + types.join("|") + ")([:([]) ?", "i");
const noTypeMatch = new RegExp("^(" + types.join("|") + ") ", "i");
const shortcodeMatch = / ?:([a-z_]+): ?/gi;

function typeReplacement(match, p1, p2) {
  const rule = getTypeRule(p1);
  if (!rule) {
    return match;
  }
  return rule.emoji + "\u2002" + (p2 == ":" ? "" : p2);
}

function noTypeReplacement(match, p1) {
  const rule = getTypeRule(p1);
  if (!rule) {
    return match;
  }
  return rule.emoji + "\u2002" + match;
}

function shortcodeReplacement(match, p1) {
  return nameToEmoji[p1] ? "\u2002" + nameToEmoji[p1] + "\u2002" : match;
}

function getTypeRule(type) {
  for (const rule of rules.types) {
    if ((Array.isArray(rule.type) ? rule.type : [rule.type]).includes(type)) {
      return rule;
    }
  }
}
