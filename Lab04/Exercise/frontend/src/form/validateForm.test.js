import test from "node:test";
import assert from "node:assert/strict";
import { validateForm } from "./validateForm.js";

const valid = {
  name: "Phong",
  email: "phong@example.com",
  password: "abcdefgh",
  confirmPassword: "abcdefgh",
};

test("valid form has no errors", () => {
  assert.deepEqual(validateForm(valid), {});
});

test("empty form reports all four fields", () => {
  const errors = validateForm({});

  assert.equal(Object.keys(errors).length, 4);
});

test("mismatched password is rejected synchronously", () => {
  const errors = validateForm({
    ...valid,
    confirmPassword: "different",
  });

  assert.ok(errors.confirmPassword);
});

test("invalid name, email and password are rejected", () => {
  const errors = validateForm({
    ...valid,
    name: " ",
    email: "bad",
    password: "abc",
  });

  assert.ok(errors.name);
  assert.ok(errors.email);
  assert.ok(errors.password);
});
