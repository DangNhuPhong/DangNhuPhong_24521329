import { TaskApp } from "./task-app.js";
import { renderApp } from "./reactive-engine.js";

const root = document.getElementById("app");

if (!root) {
  throw new Error("Root element #app was not found");
}

renderApp(TaskApp, root);
