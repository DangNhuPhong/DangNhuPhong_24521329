export function replaySequence(
  events,
  speed,
  synth,
  { onStart, onEnd },
  signal,
) {
  return new Promise((resolve) => {
    if (signal.aborted || events.length === 0) {
      resolve();
      return;
    }

    const timers = new Set();
    const running = new Set();

    const schedule = (fn, delay) => {
      const id = window.setTimeout(() => {
        timers.delete(id);

        if (!signal.aborted) {
          fn();
        }
      }, delay);

      timers.add(id);
    };

    const cleanup = () => {
      for (const id of timers) {
        window.clearTimeout(id);
      }

      timers.clear();

      for (const midi of running) {
        synth.noteOff(midi);
        onEnd(midi);
      }

      running.clear();

      signal.removeEventListener("abort", abort);

      resolve();
    };

    const abort = () => cleanup();

    signal.addEventListener("abort", abort, { once: true });

    const endAt = Math.max(
      ...events.map((event) => event.deltaMs + event.durationMs),
    );

    for (const event of events) {
      schedule(
        () => {
          const displaced = synth.noteOn(event.midi, event.freqHz);

          if (displaced !== null) {
            running.delete(displaced);
            onEnd(displaced);
          }

          running.add(event.midi);
          onStart(event.midi);
        },
        Math.max(0, event.deltaMs / speed),
      );

      schedule(
        () => {
          synth.noteOff(event.midi);
          running.delete(event.midi);
          onEnd(event.midi);
        },
        Math.max(0, (event.deltaMs + event.durationMs) / speed),
      );
    }

    schedule(cleanup, endAt / speed + 90);
  });
}
