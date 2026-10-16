export function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: String(text),
      children: [],
    },
  };
}

export function createElement(type, props, ...children) {
  if (typeof type !== "string" && typeof type !== "function") {
    throw new TypeError("Invalid VNode type");
  }

  const normalizedChildren = children
    .flat(Infinity)
    .filter(
      (child) =>
        child !== null &&
        child !== undefined &&
        child !== false &&
        child !== true,
    )
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return createTextElement(child);
      }

      if (
        typeof child === "object" &&
        child !== null &&
        typeof child.type !== "undefined"
      ) {
        return child;
      }

      throw new TypeError("Invalid child node");
    });

  return {
    type,
    props: {
      ...(props ?? {}),
      children: normalizedChildren,
    },
  };
}

export function renderToDOM(vNode) {
  if (
    !vNode ||
    typeof vNode !== "object" ||
    !vNode.props ||
    !Array.isArray(vNode.props.children)
  ) {
    throw new TypeError("Invalid VNode structure");
  }

  if (vNode.type === "TEXT_ELEMENT") {
    return document.createTextNode(String(vNode.props.nodeValue ?? ""));
  }

  if (typeof vNode.type !== "string") {
    throw new TypeError("This renderer supports native HTML tags only");
  }

  const dom = document.createElement(vNode.type);
  dom.__vnode = vNode;
  for (const [name, value] of Object.entries(vNode.props)) {
    if (
      name === "children" ||
      name === "nodeValue" ||
      value === null ||
      value === undefined ||
      name === "key"
    ) {
      continue;
    }

    if (/^on/i.test(name)) {
      if (typeof value !== "function") {
        throw new TypeError(`${name} must be a function`);
      }

      continue;
    }

    if (name === "style" && typeof value === "object") {
      Object.assign(dom.style, value);
      continue;
    }

    if (name === "className") {
      dom.setAttribute("class", String(value));
      continue;
    }

    if (name === "htmlFor") {
      dom.setAttribute("for", String(value));
      continue;
    }

    if (name === "value" && "value" in dom) {
      dom.value = String(value);
      continue;
    }

    if (name === "checked" && "checked" in dom) {
      dom.checked = Boolean(value);
      continue;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      dom.setAttribute(name, String(value));
    }
  }

  for (const child of vNode.props.children) {
    dom.appendChild(renderToDOM(child));
  }

  return dom;
}
