import { renderToDOM } from "./mini-react.js";

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
  const supportedEvents = ["click", "input", "change", "submit", "keydown"];

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
    // Save the currently focused element before rendering.
    const activeElement = document.activeElement;
    const shouldRestoreFocus =
      activeElement &&
      rootContainer.contains(activeElement) &&
      activeElement.id;

    const activeId = shouldRestoreFocus ? activeElement.id : null;

    const selectionStart =
      shouldRestoreFocus && "selectionStart" in activeElement
        ? activeElement.selectionStart
        : null;

    const selectionEnd =
      shouldRestoreFocus && "selectionEnd" in activeElement
        ? activeElement.selectionEnd
        : null;

    resetCursor();

    const vApp = App();
    const dom = renderToDOM(vApp);

    rootContainer.replaceChildren(dom);

    // Restore focus and cursor position after rendering.
    if (activeId) {
      const replacement = document.getElementById(activeId);

      if (replacement && rootContainer.contains(replacement)) {
        replacement.focus();

        if (
          selectionStart !== null &&
          selectionEnd !== null &&
          typeof replacement.setSelectionRange === "function"
        ) {
          replacement.setSelectionRange(selectionStart, selectionEnd);
        }
      }
    }
  };

  setRenderer(rerender);
  setupEventDelegation(rootContainer);
  rerender();
}
