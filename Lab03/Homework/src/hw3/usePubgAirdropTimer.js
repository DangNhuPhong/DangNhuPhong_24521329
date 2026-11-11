import { useEffect, useState } from "react";

export function usePubgAirdropTimer(targetEpochMs, serverOffsetMs = 0) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const syncClock = () => {
      setNow(Date.now());
    };

    const timerId = window.setInterval(syncClock, 200);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        syncClock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.clearInterval(timerId);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const remainingMs = Math.max(0, targetEpochMs - (now + serverOffsetMs));

  return {
    remainingMs,
    isLive: remainingMs === 0,
  };
}
