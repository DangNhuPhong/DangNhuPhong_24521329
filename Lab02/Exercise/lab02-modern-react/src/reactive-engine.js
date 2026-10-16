import { createElement, renderToDOM } from "./mini-react.js";

const stateStore = [];
let cursor = 0;
let triggerRender = () => {};

export function setRenderer(rerenderFn) {
  triggerRender = rerenderFn;
}

export function resetCursor() {
  cursor = 0;
}

export function useState(initialValue) {
  const currentCursor = cursor;

  if (!(currentCursor in stateStore)) {
    stateStore[currentCursor] = initialValue;
  }

  const setState = (nextValue) => {
    const previousValue = stateStore[currentCursor];

    const resolvedValue =
      typeof nextValue === "function" ? nextValue(previousValue) : nextValue;

    if (!Object.is(previousValue, resolvedValue)) {
      stateStore[currentCursor] = resolvedValue;
      triggerRender();
    }
  };

  cursor += 1;

  return [stateStore[currentCursor], setState];
}

export function setupEventDelegation(rootContainer) {
  const supportedEvents = ["click", "input", "keydown"];

  for (const eventType of supportedEvents) {
    rootContainer.addEventListener(eventType, (event) => {
      let target = event.target;

      while (target && target !== rootContainer) {
        const vnode = target.__vnode;

        if (vnode) {
          const handlerName =
            "on" + eventType.charAt(0).toUpperCase() + eventType.slice(1);

          const handler = vnode.props[handlerName];

          if (typeof handler === "function") {
            handler(event);
          }
        }

        target = target.parentElement;
      }
    });
  }
}

export function renderApp(App, rootContainer) {
  const rerender = () => {
    resetCursor();

    const vApp = App();
    const dom = renderToDOM(vApp);

    rootContainer.replaceChildren(dom);
  };

  setRenderer(rerender);
  setupEventDelegation(rootContainer);
  rerender();
}
