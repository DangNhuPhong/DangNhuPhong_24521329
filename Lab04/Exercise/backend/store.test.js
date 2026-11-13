import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createStore } from "./store.js";

test("concurrent writes survive a new store instance", async () => {
  const directory = await mkdtemp(join(tmpdir(), "lab4-"));

  try {
    const file = join(directory, "messages.json");
    const store = createStore(file);

    await Promise.all([
      store.add("nasa", {
        id: "1",
        text: "first",
      }),

      store.add("nasa", {
        id: "2",
        text: "second",
      }),
    ]);

    const reopened = createStore(file);
    const messages = await reopened.get("nasa");

    assert.deepEqual(
      messages.map((message) => message.id),
      ["1", "2"],
    );
  } finally {
    await rm(directory, {
      recursive: true,
      force: true,
    });
  }
});
