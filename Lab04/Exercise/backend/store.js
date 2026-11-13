import { readFile, writeFile, mkdir, rename } from "node:fs/promises";

import { dirname } from "node:path";

export function createStore(file) {
  let queue = Promise.resolve();

  async function read() {
    try {
      const content = await readFile(file, "utf8");

      return JSON.parse(content);
    } catch (error) {
      if (error.code === "ENOENT") {
        return {};
      }

      throw error;
    }
  }

  return {
    async get(channel) {
      await queue;

      const data = await read();

      return data[channel] ?? [];
    },

    add(channel, message) {
      const operation = queue.then(async () => {
        const data = await read();

        data[channel] = [...(data[channel] ?? []), message];

        await mkdir(dirname(file), {
          recursive: true,
        });

        await writeFile(`${file}.tmp`, JSON.stringify(data, null, 2), "utf8");

        await rename(`${file}.tmp`, file);

        return message;
      });

      queue = operation.catch(() => {});

      return operation;
    },
  };
}
