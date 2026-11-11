import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { DRUM_PADS } from "./drumConfig";
import { DrumAudio } from "./drumAudio";
import { useDrumKeyboard } from "./useDrumKeyboard";
import { DrumPad } from "./DrumPad";
import { HitHistory } from "./HitHistory";
import { DecibelMeter } from "./DecibelMeter";

import "./DrumMachine.css";

export function DrumMachine() {
  const engineRef = useRef(null);
  const hitId = useRef(0);

  const [pressed, setPressed] = useState([]);
  const [hits, setHits] = useState([]);
  const [level, setLevel] = useState(0);

  const padMap = useMemo(
    () => new Map(DRUM_PADS.map((pad) => [pad.code, pad])),
    [],
  );

  const trigger = useCallback((pad) => {
    if (!engineRef.current) {
      engineRef.current = new DrumAudio();
    }

    engineRef.current.play(pad);

    setPressed((prev) => (prev.includes(pad.id) ? prev : [...prev, pad.id]));

    hitId.current += 1;

    const item = {
      id: hitId.current,
      name: pad.name,
      time: new Date().toLocaleTimeString("vi-VN"),
    };

    setHits((prev) => [item, ...prev].slice(0, 8));

    setLevel((prev) => Math.max(32, Math.min(100, prev + 27)));
  }, []);

  const release = useCallback((id) => {
    setPressed((prev) => prev.filter((value) => value !== id));
  }, []);

  useDrumKeyboard(padMap, trigger, release);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLevel((value) => Math.max(0, value - 8));
    }, 110);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      engineRef.current?.close();
    };
  }, []);

  return (
    <section className="stack" aria-labelledby="drum-heading">
      <section className="panel">
        <h2 id="drum-heading">HW1 - Production Studio Drum Kit</h2>

        <p className="muted">
          Press W / A / S / D / J / K / L or click a drum pad.
        </p>

        <div className="drum-grid">
          {DRUM_PADS.map((pad) => (
            <DrumPad
              key={pad.id}
              pad={pad}
              pressed={pressed.includes(pad.id)}
              onHit={trigger}
              onRelease={release}
            />
          ))}
        </div>
      </section>

      <div className="drum-details">
        <HitHistory hits={hits} />
        <DecibelMeter level={level} />
      </div>
    </section>
  );
}
