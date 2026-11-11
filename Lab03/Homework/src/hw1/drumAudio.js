export class DrumAudio {
  constructor() {
    this.ctx = null;
    this.nodes = new Set();
  }

  play(pad) {
    if (!this.ctx || this.ctx.state === "closed") {
      this.ctx = new window.AudioContext();
    }

    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = pad.tone;

    osc.frequency.setValueAtTime(pad.frequency, now);

    osc.frequency.exponentialRampToValueAtTime(
      Math.max(35, pad.frequency * 0.6),
      now + 0.18,
    );

    gain.gain.setValueAtTime(0.12, now);

    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.onended = () => {
      osc.disconnect();
      gain.disconnect();
      this.nodes.delete(osc);
    };

    this.nodes.add(osc);

    osc.start(now);
    osc.stop(now + 0.23);
  }

  close() {
    for (const osc of this.nodes) {
      try {
        osc.stop();
      } catch {
        // Oscillator may already have stopped.
      }
    }

    this.nodes.clear();

    if (this.ctx && this.ctx.state !== "closed") {
      void this.ctx.close();
    }

    this.ctx = null;
  }
}
