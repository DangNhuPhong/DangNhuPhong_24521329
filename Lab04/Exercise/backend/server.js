import "dotenv/config";
import { resolve } from "node:path";
import { createStore } from "./store.js";
import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 3001);

const file = resolve(process.env.DATA_FILE ?? "./data/messages.json");

const store = createStore(file);

const app = createApp(store, process.env.CLIENT_ORIGIN);

app.listen(port, () => {
  console.log(`Forum API: http://localhost:${port}`);
});
