export function createAntiDriftTimer(
  durationMs,
  onTick,
  onComplete = () => {},
) {
  if (!Number.isFinite(durationMs) || durationMs < 0) {
    throw new RangeError("durationMs must be a non-negative number.");
  }

  const targetTime = Date.now() + durationMs;
  let rafId = null;
  let cancelled = false;
  let completed = false;

  function tick() {
    if (cancelled || completed) return;

    const remaining = Math.max(0, targetTime - Date.now());
    onTick(remaining);

    if (remaining <= 0) {
      completed = true;
      onComplete();
      return;
    }

    rafId = requestAnimationFrame(tick);
  }

  tick();

  return () => {
    cancelled = true;

    if (rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  };
}
