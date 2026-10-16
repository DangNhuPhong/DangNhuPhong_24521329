
const allowedStatuses = new Set([
  "IDLE",
  "LOADING",
  "SUCCESS",
  "ERROR",
]);

function createState(status, extra = {}) {
  if (!allowedStatuses.has(status)) {
    throw new Error(`Invalid state: ${status}`);
  }

  return { status, ...extra };
}

// Demo API: thay bằng fetchFeed() thật khi tích hợp API.
async function fetchFeed(signal) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
    { signal }
  );

  if (!response.ok) {
    throw new Error(`Server returned ${response.status}`);
  }

  return response.json();
}

export function renderDataFeed(root) {
  let state = createState("IDLE");
  let activeController = null;
  let requestId = 0;

  const main = document.createElement("main");
  main.className = "feed";

  const heading = document.createElement("h1");
  heading.textContent = "Data Feed";

  const statusText = document.createElement("p");
  statusText.setAttribute("role", "status");
  statusText.setAttribute("aria-live", "polite");

  const content = document.createElement("section");
  content.setAttribute("aria-label", "Feed content");

  const retryButton = document.createElement("button");
  retryButton.type = "button";
  retryButton.textContent = "Retry Connection";
  retryButton.hidden = true;

  main.append(heading, statusText, content, retryButton);
  root.replaceChildren(main);

  function render() {
    content.replaceChildren();
    retryButton.hidden = true;

    if (state.status === "IDLE") {
      statusText.textContent = "Ready to load data.";
      const loadButton = document.createElement("button");
      loadButton.type = "button";
      loadButton.textContent = "Load Data";
      loadButton.addEventListener("click", loadData);
      content.append(loadButton);
      return;
    }

    if (state.status === "LOADING") {
      statusText.textContent = "Loading data…";

      const skeletonList = document.createElement("ul");
      skeletonList.className = "skeleton-list";
      skeletonList.setAttribute("aria-label", "Loading items");

      for (let i = 0; i < 4; i += 1) {
        const item = document.createElement("li");
        item.className = "skeleton";
        item.setAttribute("aria-hidden", "true");
        skeletonList.append(item);
      }

      content.append(skeletonList);
      return;
    }

    if (state.status === "SUCCESS") {
      statusText.textContent = "Data loaded successfully.";

      const list = document.createElement("ul");

      for (const item of state.data) {
        const row = document.createElement("li");
        const title = document.createElement("h2");
        const body = document.createElement("p");

        title.textContent = String(item.title ?? "Untitled");
        body.textContent = String(item.body ?? "");

        row.append(title, body);
        list.append(row);
      }

      content.append(list);

      const reloadButton = document.createElement("button");
      reloadButton.type = "button";
      reloadButton.textContent = "Reload Data";
      reloadButton.addEventListener("click", loadData);
      content.append(reloadButton);
      return;
    }

    if (state.status === "ERROR") {
      statusText.textContent = "Unable to load data.";

      const message = document.createElement("p");
      message.textContent = state.error;

      content.append(message);
      retryButton.hidden = false;
    }
  }

  async function loadData() {
    const thisRequestId = ++requestId;

    activeController?.abort();
    activeController = new AbortController();

    state = createState("LOADING");
    render();

    try {
      const data = await fetchFeed(activeController.signal);

      if (thisRequestId !== requestId) return;

      state = createState("SUCCESS", { data });
    } catch (error) {
      if (thisRequestId !== requestId) return;
      if (error.name === "AbortError") return;

      state = createState("ERROR", {
        error: "Please check your connection and try again.",
      });
    }

    render();
  }

  retryButton.addEventListener("click", loadData);
  render();

  return () => {
    requestId += 1;
    activeController?.abort();
  };
}
