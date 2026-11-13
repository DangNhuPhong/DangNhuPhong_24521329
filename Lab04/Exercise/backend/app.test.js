import test from "node:test";
import assert from "node:assert/strict";
import { once } from "node:events";
import { createApp } from "./app.js";

test("API validates messages and isolates channels", async () => {
  const buckets = new Map();

  const store = {
    async get(channel) {
      return buckets.get(channel) ?? [];
    },

    async add(channel, message) {
      buckets.set(channel, [...(buckets.get(channel) ?? []), message]);

      return message;
    },
  };

  const server = createApp(store).listen(0, "127.0.0.1");

  await once(server, "listening");

  const base = `http://127.0.0.1:${server.address().port}`;

  const url = `${base}/api/forums/nasa/messages`;

  try {
    const invalid = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: " ",
        text: "",
      }),
    });

    assert.equal(invalid.status, 400);

    const created = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: " Phong ",
        text: " Hello ",
        id: "fake",
      }),
    });

    assert.equal(created.status, 201);

    const message = await created.json();

    assert.match(message.id, /^[0-9a-f-]{36}$/i);
    assert.equal(message.author, "Phong");
    assert.equal(message.text, "Hello");

    assert.ok(Number.isFinite(Date.parse(message.timestamp)));

    const messages = await (await fetch(url)).json();

    assert.equal(messages.length, 1);

    const otherChannel = await fetch(`${base}/api/forums/notNasa/messages`);

    assert.deepEqual(await otherChannel.json(), []);

    const unknown = await fetch(`${base}/api/forums/unknown/messages`);

    assert.equal(unknown.status, 404);

    const alias = await fetch(`${base}/api/messages/nasa`);

    assert.equal(alias.status, 200);

    const malformed = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "{",
    });

    assert.equal(malformed.status, 400);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});
