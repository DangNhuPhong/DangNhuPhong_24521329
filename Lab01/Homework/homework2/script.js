"use strict";

// ============================================================
// T-02: AUDIO ENGINE
// Independent from the UI and keyboard controller.
// ============================================================

const AudioEngine = (() => {
  function play(soundPath) {
    const audio = new Audio(soundPath);

    audio.preload = "auto";

    const playback = audio.play();

    if (playback) {
      playback.catch((error) => {
        console.error("Audio playback failed:", error.message);
      });
    }

    return audio;
  }

  return { play };
})();

// ============================================================
// T-03: DOM CONTRACT AND KEYBOARD CONTROLLER
// ============================================================

const drumPads = Array.from(
  document.querySelectorAll(".drum-pad[data-key][data-sound]"),
);

const padByKey = new Map();

for (const pad of drumPads) {
  const key = pad.dataset.key.toLowerCase();
  const sound = pad.dataset.sound;

  if (!key || !sound || padByKey.has(key)) {
    console.error("Invalid or duplicate drum pad contract:", pad);
    continue;
  }

  padByKey.set(key, pad);
}

// ============================================================
// T-04: FIFO BEAT RECORDER
// ============================================================

const recordButton = document.querySelector("#record-button");
const stopButton = document.querySelector("#stop-button");
const playButton = document.querySelector("#play-button");
const clearButton = document.querySelector("#clear-button");

const recordingStatus = document.querySelector("#recording-status");
const beatCount = document.querySelector("#beat-count");
const beatList = document.querySelector("#beat-list");

const beats = [];

let isRecording = false;
let recordingStartedAt = 0;
let isPlayingRecording = false;
let playbackTimers = [];

function updateRecorderUI() {
  recordButton.disabled = isRecording || isPlayingRecording;
  stopButton.disabled = !isRecording;
  playButton.disabled = beats.length === 0 || isRecording || isPlayingRecording;
  clearButton.disabled = isRecording || isPlayingRecording;

  recordButton.classList.toggle("is-recording", isRecording);

  beatCount.textContent = `Recorded events: ${beats.length}`;
}

function renderBeats() {
  beatList.replaceChildren();

  if (beats.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No beats recorded yet.";
    beatList.append(emptyItem);
    updateRecorderUI();
    return;
  }

  for (const beat of beats) {
    const item = document.createElement("li");

    item.textContent =
      `${beat.key.toUpperCase()} — ${beat.soundName} — ` +
      `${beat.elapsed.toFixed(1)} ms`;

    beatList.append(item);
  }

  updateRecorderUI();
}

function startRecording() {
  if (isRecording || isPlayingRecording) {
    return;
  }

  beats.length = 0;
  recordingStartedAt = performance.now();
  isRecording = true;

  recordingStatus.textContent = "Recording. Play your rhythm now.";

  renderBeats();
  updateRecorderUI();
}

function stopRecording() {
  if (!isRecording) {
    return;
  }

  isRecording = false;

  recordingStatus.textContent = `Recording stopped. ${beats.length} event(s) recorded.`;

  renderBeats();
  updateRecorderUI();
}

function recordBeat(key, pad) {
  if (!isRecording) {
    return;
  }

  const timestamp = performance.now();

  // Append to the end of the FIFO queue.
  beats.push({
    key,
    sound: pad.dataset.sound,
    soundName: pad.querySelector(".pad-name").textContent,
    timestamp,
    elapsed: timestamp - recordingStartedAt,
  });

  renderBeats();
}

// ============================================================
// T-03: PAD TRIGGER
// Connects UI events to the independent AudioEngine.
// ============================================================

function triggerPad(pad) {
  if (!pad) {
    return;
  }

  const key = pad.dataset.key.toLowerCase();
  const sound = pad.dataset.sound;

  AudioEngine.play(sound);

  pad.classList.add("is-active");

  window.setTimeout(() => {
    pad.classList.remove("is-active");
  }, 100);

  recordBeat(key, pad);
}

for (const pad of drumPads) {
  pad.addEventListener("click", () => {
    triggerPad(pad);
  });
}

window.addEventListener("keydown", (event) => {
  // Do not repeat sounds when a key is held down.
  if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  // Do not intercept typing in editable fields.
  const target = event.target;

  if (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
  ) {
    return;
  }

  const key = event.key.toLowerCase();
  const pad = padByKey.get(key);

  if (!pad) {
    return;
  }

  event.preventDefault();
  triggerPad(pad);
});

// ============================================================
// T-05: RECORDED BEAT PLAYBACK
// ============================================================

function cancelPlaybackTimers() {
  for (const timer of playbackTimers) {
    window.clearTimeout(timer);
  }

  playbackTimers = [];
}

function playRecording() {
  if (beats.length === 0 || isRecording || isPlayingRecording) {
    return;
  }

  isPlayingRecording = true;

  // Create a stable snapshot of the FIFO event queue.
  const sequence = beats.map((beat) => ({ ...beat }));

  const firstTimestamp = sequence[0].timestamp;

  recordingStatus.textContent = "Playing recorded beat...";

  updateRecorderUI();

  for (const beat of sequence) {
    const delay = Math.max(0, beat.timestamp - firstTimestamp);

    const timer = window.setTimeout(() => {
      const pad = padByKey.get(beat.key);

      if (pad) {
        // Playback does not add events to the recording queue.
        AudioEngine.play(beat.sound);

        pad.classList.add("is-active");

        window.setTimeout(() => {
          pad.classList.remove("is-active");
        }, 100);
      }
    }, delay);

    playbackTimers.push(timer);
  }

  const finalDelay = Math.max(
    0,
    sequence[sequence.length - 1].timestamp - firstTimestamp,
  );

  const finishTimer = window.setTimeout(() => {
    playbackTimers = [];
    isPlayingRecording = false;

    recordingStatus.textContent = "Playback completed.";

    updateRecorderUI();
  }, finalDelay + 150);

  playbackTimers.push(finishTimer);
}

// ============================================================
// T-04/T-05: CONTROL EVENTS
// ============================================================

recordButton.addEventListener("click", startRecording);
stopButton.addEventListener("click", stopRecording);
playButton.addEventListener("click", playRecording);

clearButton.addEventListener("click", () => {
  if (isRecording || isPlayingRecording) {
    return;
  }

  beats.length = 0;

  recordingStatus.textContent = "Beat queue cleared.";

  renderBeats();
});

// Initial UI state.
renderBeats();
