import fs from "fs";
import emojionalCommitment from "../index.js";

export default function emojionalCommitmentRunner(): void {
  const msg = fs
    .readFileSync(process.argv[2] == "-" ? 0 : process.argv[2], "utf8")
    .trim();

  const newMsg = emojionalCommitment(msg);

  if (newMsg != msg) {
    fs.writeFileSync(process.argv[2], newMsg);
  }
}
