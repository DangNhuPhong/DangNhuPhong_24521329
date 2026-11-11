export class PolyphonicSynth {
  constructor(maxVoices = 8) {
    this.maxVoices = maxVoices;
    this.ctx = null;
    this.voices = new Map();
  }

  ensureAudio() {
    if (!this.ctx || this.ctx.state === "closed") {
      this.ctx = new window.AudioContext();
    }

    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }

    return this.ctx;
  }

  noteOn(midi, frequency) {
    const ctx = this.ensureAudio();

    if (this.voices.has(midi)) {
      return null;
    }

    let stolenMidi = null;

    if (this.voices.size >= this.maxVoices) {
      stolenMidi = this.voices.keys().next().value;
      this.noteOff(stolenMidi);
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = "sine";

    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.0001, now);

    gain.gain.exponentialRampToValueAtTime(0.14, now + 0.025);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
    };

    osc.start();

    this.voices.set(midi, {
      osc,
      gain,
    });

    return stolenMidi;
  }

  noteOff(midi) {
    const voice = this.voices.get(midi);

    if (!voice || !this.ctx) return;

    this.voices.delete(midi);

    const now = this.ctx.currentTime;

    voice.gain.gain.cancelScheduledValues(now);

    voice.gain.gain.setValueAtTime(
      Math.max(0.0001, voice.gain.gain.value),
      now,
    );

    voice.gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    try {
      voice.osc.stop(now + 0.05);
    } catch {
      // Oscillator already stopped.
    }
  }

  stopAll() {
    for (const midi of [...this.voices.keys()]) {
      this.noteOff(midi);
    }
  }

  close() {
    this.stopAll();

    if (this.ctx && this.ctx.state !== "closed") {
      void this.ctx.close();
    }

    this.ctx = null;
  }
}
