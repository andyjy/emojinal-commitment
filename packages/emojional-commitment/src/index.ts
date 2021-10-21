import fs from "fs";
import { nameToEmoji } from "gemoji";

type EmojionalConfigType = {
  type: string | [string];
  emoji: string;
};

export default function emojionalCommitment(msg: string) {
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

const typeMatch = new RegExp("^(" + types.join("|") + ")([:([]) ?", "i");
const noTypeMatch = new RegExp("^(" + types.join("|") + ") ", "i");
const shortcodeMatch = / ?:([a-z_]+): ?/gi;

function typeReplacement(match: string, p1: string, p2: string) {
  const rule = getTypeRule(p1);
  if (!rule) {
    return match;
  }
  return rule.emoji + "\u2002" + (p2 == ":" ? "" : p2);
}

function noTypeReplacement(match: string, p1: string) {
  const rule = getTypeRule(p1);
  if (!rule) {
    return match;
  }
  return rule.emoji + "\u2002" + match;
}

function shortcodeReplacement(match: string, p1: string) {
  return (nameToEmoji as unknown as any)[p1]
    ? "\u2002" + (nameToEmoji as unknown as any)[p1] + "\u2002"
    : match;
}

function getTypeRule(type: string) {
  for (const rule of rules.types) {
    if ((Array.isArray(rule.type) ? rule.type : [rule.type]).includes(type)) {
      return rule;
    }
  }
}
