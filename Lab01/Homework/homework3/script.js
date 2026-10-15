"use strict";

// --------------------------------------------------
// SLICE 1: DRIFT-FREE UTC COUNTDOWN
// --------------------------------------------------

const countdownStatus = document.querySelector("#countdown-status");
const countdownClock = document.querySelector("#countdown-clock");

const countdownParts = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

// Example target: January 1, 2027 at 00:00:00 UTC.
const TARGET_UTC = "2027-01-01T00:00:00Z";
const targetTime = Date.parse(TARGET_UTC);

let countdownTimerId = null;

function formatNumber(value) {
  return String(value).padStart(2, "0");
}

function stopCountdown() {
  if (countdownTimerId !== null) {
    clearTimeout(countdownTimerId);
    countdownTimerId = null;
  }
}

function updateCountdown() {
  stopCountdown();

  if (!Number.isFinite(targetTime)) {
    countdownClock.hidden = true;
    countdownStatus.textContent =
      "Countdown unavailable: the target timestamp is invalid.";
    return;
  }

  const remainingMs = targetTime - Date.now();

  if (remainingMs <= 0) {
    countdownClock.hidden = true;
    countdownStatus.textContent =
      "The event has started or the target has passed.";
    return;
  }

  const totalSeconds = Math.floor(remainingMs / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownParts.days.textContent = formatNumber(days);
  countdownParts.hours.textContent = formatNumber(hours);
  countdownParts.minutes.textContent = formatNumber(minutes);
  countdownParts.seconds.textContent = formatNumber(seconds);

  countdownClock.hidden = false;
  countdownStatus.textContent = "Time remaining until the event.";

  // Recalculate from the real clock instead of decrementing a counter.
  // Align the next update approximately with the next second boundary.
  const delay = 1000 - (Date.now() % 1000);
  countdownTimerId = setTimeout(updateCountdown, delay);
}

updateCountdown();
