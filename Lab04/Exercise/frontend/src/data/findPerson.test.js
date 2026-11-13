import test from "node:test";
import assert from "node:assert/strict";
import { people } from "./people.js";
import { findPerson } from "./findPerson.js";

test("finds an exact ID without changing the data", () => {
  const before = JSON.stringify(people);

  assert.equal(findPerson(people, "phong"), people[0]);
  assert.equal(JSON.stringify(people), before);
});

test("unknown, missing and partial IDs do not match", () => {
  for (const id of ["unknown", undefined, "pho"]) {
    assert.equal(findPerson(people, id), undefined);
  }
});
