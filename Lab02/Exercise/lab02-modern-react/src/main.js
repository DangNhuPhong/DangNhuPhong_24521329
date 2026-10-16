import { TaskApp } from "./task-app.js";
import { renderApp } from "./reactive-engine.js";
import { renderDataFeed } from "./data-feed.js";
import "./style.css";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Root element #app was not found");
}

root.replaceChildren();

const taskRoot = document.createElement("section");
taskRoot.id = "task-app";

const feedRoot = document.createElement("section");
feedRoot.id = "data-feed";

root.append(taskRoot, feedRoot);

renderApp(TaskApp, taskRoot);

const cleanup = renderDataFeed(feedRoot);

if (import.meta.hot) {
  import.meta.hot.dispose(cleanup);
}
