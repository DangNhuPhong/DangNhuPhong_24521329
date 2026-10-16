import { createElement as h, renderToDOM } from "./mini-react.js";

import { useState } from "./reactive-engine.js";

let nextTaskId = 3;

const initialTasks = [
  { id: 1, title: "Review PR", completed: false },
  { id: 2, title: "Verify AST", completed: true },
];

export function TaskApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("ALL");
  const [input, setInput] = useState("");

  const visibleTasks = tasks.filter((task) => {
    if (filter === "ACTIVE") return !task.completed;
    if (filter === "COMPLETED") return task.completed;
    return true;
  });

  return h(
    "main",
    { className: "app-container" },
    h(
      "header",
      null,
      h("h1", null, "Reactive Task Manager"),
      h("p", null, `Tasks: ${tasks.length}`),
    ),
    h(
      "form",
      {
        onSubmit: (event) => {
          event.preventDefault();

          const title = input.trim();
          if (!title) return;

          setTasks((previous) => [
            ...previous,
            {
              id: nextTaskId++,
              title,
              completed: false,
            },
          ]);

          setInput("");
        },
      },
      h("label", { htmlFor: "task-input" }, "New task"),
      h("input", {
        id: "task-input",
        value: input,
        onInput: (event) => setInput(event.target.value),
        placeholder: "Enter a task",
      }),
      h("button", { type: "submit" }, "Add Task"),
    ),
    h(
      "nav",
      { "aria-label": "Filter tasks" },
      ...["ALL", "ACTIVE", "COMPLETED"].map((option) =>
        h(
          "button",
          {
            type: "button",
            "aria-pressed": filter === option,
            onClick: () => setFilter(option),
          },
          option,
        ),
      ),
    ),
    h(
      "section",
      { "aria-label": "Task list" },
      h(
        "ul",
        null,
        ...visibleTasks.map((task) =>
          h(
            "li",
            { key: task.id },
            h("input", {
              type: "checkbox",
              checked: task.completed,
              "aria-label": `Complete ${task.title}`,
              onChange: () => {
                setTasks((previous) =>
                  previous.map((item) =>
                    item.id === task.id
                      ? { ...item, completed: !item.completed }
                      : item,
                  ),
                );
              },
            }),
            h("span", null, task.title),
            h(
              "button",
              {
                type: "button",
                onClick: () =>
                  setTasks((previous) =>
                    previous.filter((item) => item.id !== task.id),
                  ),
              },
              "Delete",
            ),
          ),
        ),
      ),
    ),
  );
}
