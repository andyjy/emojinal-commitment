import { test, expect } from "@jest/globals";
import ec from "../src/index";

test("empty string", () => {
  expect(ec("")).toBe("");
});

test("no type", () => {
  expect(ec("123")).toBe("123");
});

test("shortcodes", () => {
  expect(ec(":tada:")).toBe("\u2002🎉\u2002");
  expect(ec("oh :tada:")).toBe("oh\u2002🎉\u2002");
  expect(ec("fix: :tada:")).toBe("🐛\u2002\u2002🎉\u2002");
});

test("feature:", () => {
  expect(ec("feat: feature")).toBe("✨\u2002feature");
  expect(ec("feature: feature")).toBe("✨\u2002feature");
});

test("no space", () => {
  expect(ec("feat:feature")).toBe("✨\u2002feature");
});

test("scope", () => {
  expect(ec("feat(foo): feature")).toBe("✨\u2002(foo): feature");
});

test("fix:", () => {
  expect(ec("fix: bug")).toBe("🐛\u2002bug");
  expect(ec("fixes: bug")).toBe("🐛\u2002bug");
});

test("fix (no type colon:)", () => {
  expect(ec("fix bug")).toBe("🐛\u2002fix bug");
  expect(ec("fixes bug")).toBe("🐛\u2002fixes bug");
});
