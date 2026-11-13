import test from "node:test";
import assert from "node:assert/strict";
import { validateMessage } from "../shared/messageValidation.js";

test("normalizes input and ignores client metadata", () => {
  const result = validateMessage({
    author: " Phong ",
    text: " Hello ",
    id: "fake",
  });

  assert.deepEqual(result, {
    errors: {},
    value: {
      author: "Phong",
      text: "Hello",
    },
  });
});

test("rejects missing, non-string and long values", () => {
  const invalidPayloads = [
    null,
    [],
    {},
    { author: 1, text: false },
    {
      author: "x".repeat(41),
      text: "x".repeat(501),
    },
  ];

  for (const payload of invalidPayloads) {
    const { errors } = validateMessage(payload);

    assert.equal(Object.keys(errors).length, 2);
  }
});

test("rejects whitespace content", () => {
  const { errors } = validateMessage({
    author: "Phong",
    text: "   ",
  });

  assert.ok(errors.text);
});
