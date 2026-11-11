import { useCallback, useEffect, useRef, useState } from "react";

import { PolyphonicSynth } from "./PolyphonicSynth";
import { replaySequence } from "./PianoSequencer";
import { PIANO_NOTES, WHITE_COUNT } from "./pianoNotes";
import { PianoKeyboard } from "./PianoKeyboard";
import { PianoControls } from "./PianoControls";
import { RecordingPanel } from "./RecordingPanel";

import "./GrandPiano88.css";

const NOTES_BY_MIDI = new Map(PIANO_NOTES.map((note) => [note.midi, note]));

export function GrandPiano88() {
  const synthRef = useRef(null);
  const replayRef = useRef(null);

  const recordRef = useRef({
    active: false,
    startTime: 0,
    held: new Map(),
    events: [],
  });

  const [active, setActive] = useState(() => new Set());
  const [events, setEvents] = useState([]);
  const [recording, setRecording] = useState(false);
  const [replaying, setReplaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const ensureSynth = () => {
    if (!synthRef.current) {
      synthRef.current = new PolyphonicSynth(8);
    }
    return synthRef.current;
  };

  const markOn = useCallback((midi) => {
    setActive((prev) => {
      if (prev.has(midi)) return prev;
      return new Set([...prev, midi]);
    });
  }, []);

  const markOff = useCallback((midi) => {
    setActive((prev) => {
      if (!prev.has(midi)) return prev;

      const next = new Set(prev);
      next.delete(midi);

      return next;
    });
  }, []);

  const finishHeld = useCallback((midi) => {
    const rec = recordRef.current;
    const started = rec.held.get(midi);

    if (!started) return;

    rec.held.delete(midi);

    rec.events.push({
      midi,
      freqHz: NOTES_BY_MIDI.get(midi).freqHz,
      deltaMs: started.time - rec.startTime,
      durationMs: Math.max(50, performance.now() - started.time),
    });
  }, []);

  const onDown = useCallback(
    (midi) => {
      const note = NOTES_BY_MIDI.get(midi);

      if (!note || replayRef.current) return;

      if (!synthRef.current) {
        synthRef.current = new PolyphonicSynth(8);
      }

      const displaced = synthRef.current.noteOn(midi, note.freqHz);

      if (displaced !== null) {
        finishHeld(displaced);
        markOff(displaced);
      }

      markOn(midi);

      const rec = recordRef.current;

      if (rec.active && !rec.held.has(midi)) {
        rec.held.set(midi, {
          time: performance.now(),
        });
      }
    },
    [finishHeld, markOff, markOn],
  );

  const onUp = useCallback(
    (midi) => {
      synthRef.current?.noteOff(midi);
      finishHeld(midi);
      markOff(midi);
    },
    [finishHeld, markOff],
  );

  const startRecording = () => {
    synthRef.current?.stopAll();
    setActive(new Set());

    recordRef.current = {
      active: true,
      startTime: performance.now(),
      held: new Map(),
      events: [],
    };

    setEvents([]);
    setRecording(true);
  };

  const stopRecording = () => {
    const rec = recordRef.current;

    for (const midi of [...rec.held.keys()]) {
      finishHeld(midi);
    }

    rec.active = false;

    const sorted = rec.events.toSorted((a, b) => a.deltaMs - b.deltaMs);

    setEvents(sorted);
    setRecording(false);
  };

  const stop = () => {
    replayRef.current?.abort();
    replayRef.current = null;

    synthRef.current?.stopAll();

    setActive(new Set());
    setReplaying(false);
  };

  const play = () => {
    if (!events.length || replayRef.current) {
      return;
    }

    const controller = new AbortController();
    replayRef.current = controller;

    setReplaying(true);

    void replaySequence(
      events,
      speed,
      ensureSynth(),
      {
        onStart: markOn,
        onEnd: markOff,
      },
      controller.signal,
    ).finally(() => {
      if (replayRef.current === controller) {
        replayRef.current = null;
        setReplaying(false);
      }
    });
  };

  useEffect(() => {
    return () => {
      replayRef.current?.abort();
      synthRef.current?.close();
    };
  }, []);

  return (
    <section className="stack" aria-labelledby="piano-heading">
      <section className="panel">
        <h2 id="piano-heading">HW2 - 88-Key Polyphonic Piano</h2>

        <p className="muted">
          A0-C8 | {WHITE_COUNT} white keys | {PIANO_NOTES.length - WHITE_COUNT}{" "}
          black keys | Max 8 voices
        </p>

        <PianoKeyboard active={active} onDown={onDown} onUp={onUp} />

        <p className="muted">
          Scroll horizontally to see all keys. Active voices: {active.size}/8
        </p>
      </section>

      <PianoControls
        recording={recording}
        replaying={replaying}
        speed={speed}
        hasSequence={events.length > 0}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
        onPlay={play}
        onStop={stop}
        onSpeed={setSpeed}
      />

      <RecordingPanel events={events} />
    </section>
  );
}
