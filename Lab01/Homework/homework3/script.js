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

// --------------------------------------------------
// SLICE 2: STATE-MACHINE REGISTRATION FORM
// --------------------------------------------------

const form = document.querySelector("#registration-form");
const submitButton = document.querySelector("#submit-button");
const resetButton = document.querySelector("#reset-button");
const formStatus = document.querySelector("#form-status");

const confirmation = document.querySelector("#confirmation");
const confirmationName = document.querySelector("#confirmation-name");
const confirmationEmail = document.querySelector("#confirmation-email");
const confirmationMessage = document.querySelector("#confirmation-message");

const allowedTransitions = {
  idle: ["submitting"],
  submitting: ["success", "error"],
  success: ["idle", "submitting"],
  error: ["idle", "submitting"],
};

let formState = "idle";
let submissionInProgress = false;
let submissionToken = 0;

function setFormState(nextState, message) {
  const allowed = allowedTransitions[formState];

  if (!allowed.includes(nextState)) {
    console.error(
      `Invalid form state transition: ${formState} -> ${nextState}`,
    );
    return false;
  }

  formState = nextState;

  const isSubmitting = formState === "submitting";

  submitButton.disabled = isSubmitting;
  resetButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting
    ? "Submitting…"
    : "Submit registration";

  formStatus.textContent = message;
  formStatus.dataset.state = formState;

  return true;
}

// Demonstration only. Replace this function with a real API request
// if the assignment is later extended to include a backend.
async function submitRegistration(data) {
  await new Promise((resolve) => setTimeout(resolve, 700));

  return {
    ok: true,
    data,
  };
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Guard against duplicate submissions, including rapid repeated events.
  if (submissionInProgress || formState === "submitting") {
    return;
  }

  if (!form.reportValidity()) {
    return;
  }

  const nameInput = form.elements.namedItem("name");
  const emailInput = form.elements.namedItem("email");
  const messageInput = form.elements.namedItem("message");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (name.length < 2 || name.length > 80 || email.length > 254) {
    setFormState("error", "Please check your name and email address.");
    return;
  }

  if (message.length > 500) {
    setFormState("error", "Your message must be 500 characters or fewer.");
    return;
  }

  const data = { name, email, message };

  submissionInProgress = true;
  const currentToken = ++submissionToken;

  if (!setFormState("submitting", "Submitting your registration…")) {
    submissionInProgress = false;
    return;
  }

  confirmation.hidden = true;

  try {
    const result = await submitRegistration(data);

    // Ignore a stale response if a newer operation has replaced this one.
    if (currentToken !== submissionToken) {
      return;
    }

    if (!result.ok) {
      throw new Error("Registration was not successful.");
    }

    // Render user-provided data as text, never as HTML.
    confirmationName.textContent = `Name: ${result.data.name}`;
    confirmationEmail.textContent = `Email: ${result.data.email}`;
    confirmationMessage.textContent = result.data.message
      ? `Message: ${result.data.message}`
      : "Message: Not provided";

    confirmation.hidden = false;
    setFormState("success", "Demo registration completed successfully.");
  } catch (error) {
    if (currentToken !== submissionToken) {
      return;
    }

    console.error("Registration error:", error);
    setFormState("error", "Registration failed. Please try again.");
  } finally {
    if (currentToken === submissionToken) {
      submissionInProgress = false;
    }
  }
});

form.addEventListener("input", () => {
  if (formState === "success" || formState === "error") {
    setFormState("idle", "Your changes have not been submitted yet.");
  }
});

form.addEventListener("reset", (event) => {
  if (formState === "submitting") {
    event.preventDefault();
    return;
  }

  submissionToken += 1;
  submissionInProgress = false;
  confirmation.hidden = true;

  setFormState("idle", "Form reset. Ready to register.");
});

window.addEventListener("pagehide", stopCountdown);
