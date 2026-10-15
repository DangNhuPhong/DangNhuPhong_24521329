"use strict";

const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const currentYear = document.querySelector("#current-year");

const nameInput = document.querySelector("#contact-name");
const emailInput = document.querySelector("#contact-email");
const messageInput = document.querySelector("#contact-message");

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

// 1. Read saved theme safely.
function getSavedTheme() {
  try {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }
  } catch {
    // Storage may be unavailable in restricted environments.
  }

  return systemPrefersDark.matches ? "dark" : "light";
}

// 2. Apply theme and synchronize the accessible button state.
function applyTheme(theme) {
  const isDark = theme === "dark";

  root.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(isDark));

  try {
    localStorage.setItem("theme", theme);
  } catch {
    // The theme still works for the current page session.
  }
}

// 3. Toggle between light and dark themes.
themeToggle.addEventListener("click", () => {
  const currentTheme = root.dataset.theme || "light";
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme(nextTheme);
});

// Initialize theme.
applyTheme(getSavedTheme());

// 4. Update the copyright year.
currentYear.textContent = String(new Date().getFullYear());

// 5. Handle contact form validation and safe feedback.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  // Validate trimmed values as well as native HTML constraints.
  if (
    name.length < 2 ||
    name.length > 80 ||
    email.length > 254 ||
    message.length < 10 ||
    message.length > 2000
  ) {
    formStatus.textContent =
      "Please check the name, email, and message lengths.";

    return;
  }

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  // Safe text output: never render form input using innerHTML.
  formStatus.textContent =
    "Your form passed validation. This demo does not send or store messages.";

  contactForm.reset();
});
