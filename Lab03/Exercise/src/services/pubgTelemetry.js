const PACKET_LOSS_RATE = 0.35;

const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      return reject(new DOMException("Aborted", "AbortError"));
    }

    const id = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);

    function onAbort() {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    }

    signal?.addEventListener("abort", onAbort, { once: true });
  });

export async function fetchKraftonPubgTelemetry(squadId, { signal } = {}) {
  const res = await fetch(`/mock/pubg/${encodeURIComponent(squadId)}.json`, {
    signal,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();

  await sleep(600 + Math.random() * 600, signal);

  if (Math.random() < PACKET_LOSS_RATE) {
    throw new Error("Satellite packet timeout (35% loss simulation)");
  }

  return data;
}
