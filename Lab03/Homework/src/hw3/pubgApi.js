import { INITIAL_DROPS } from "./pubgData";

const stock = new Map(
  INITIAL_DROPS.map((drop) => [drop.id, drop.remainingStock]),
);

const claimedRequests = new Map();

export async function claimDrop({
  dropId,
  claimId,
  forceConflict = false,
  signal,
}) {
  if (signal?.aborted) {
    throw new DOMException("Canceled", "AbortError");
  }

  await new Promise((resolve, reject) => {
    const id = window.setTimeout(() => {
      signal?.removeEventListener("abort", canceled);

      resolve();
    }, 650);

    function canceled() {
      window.clearTimeout(id);

      reject(new DOMException("Canceled", "AbortError"));
    }

    signal?.addEventListener("abort", canceled, { once: true });
  });

  if (claimedRequests.has(claimId)) {
    return claimedRequests.get(claimId);
  }

  const available = stock.get(dropId);

  if (forceConflict || available == null || available <= 0) {
    const error = new Error("409 Conflict - inventory already claimed");

    error.status = 409;
    throw error;
  }

  stock.set(dropId, available - 1);

  const result = {
    ok: true,
    claimId,
    remainingStock: available - 1,
  };

  claimedRequests.set(claimId, result);

  return result;
}
