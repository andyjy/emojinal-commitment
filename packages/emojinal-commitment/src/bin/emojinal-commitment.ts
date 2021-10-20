#!/usr/bin/env node

import fs from "fs";
import emojinalCommitment from "../index.js";

export default function emojinalCommitmentRunner() {
  const msg = fs
    .readFileSync(process.argv[2] == "-" ? 0 : process.argv[2], "utf8")
    .trim();

  const newMsg = emojinalCommitment(msg);

  if (newMsg != msg) {
    fs.writeFileSync(process.argv[2], newMsg);
  }
}
