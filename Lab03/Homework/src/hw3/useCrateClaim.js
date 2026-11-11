import { useEffect, useRef, useState } from "react";

import { claimDrop } from "./pubgApi";

export function useCrateClaim(initialStock) {
  const [stock, setStock] = useState(initialStock);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const pending = useRef(false);
  const controller = useRef(null);

  useEffect(() => {
    return () => controller.current?.abort();
  }, []);

  const claim = async (dropId, forceConflict = false) => {
    if (pending.current || stock <= 0) {
      return;
    }

    pending.current = true;
    controller.current = new AbortController();

    // Optimistic update: deduct stock immediately.
    setStock((previous) => previous - 1);
    setStatus("pending");
    setMessage("Sending claim...");

    try {
      const result = await claimDrop({
        dropId,
        claimId: crypto.randomUUID(),
        forceConflict,
        signal: controller.current.signal,
      });

      setStock(result.remainingStock);

      setStatus("success");
      setMessage("Claim accepted by demo API.");
    } catch (error) {
      if (error.name !== "AbortError") {
        // Roll back the optimistic deduction.
        setStock((previous) => previous + 1);

        setStatus("error");

        setMessage(
          error.status === 409
            ? "409 Conflict: stock restored."
            : error.message,
        );
      }
    } finally {
      pending.current = false;
      controller.current = null;
    }
  };

  return {
    stock,
    status,
    message,
    claim,
  };
}
