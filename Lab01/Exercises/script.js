const themeToggle = document.querySelector("#theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.documentElement.dataset.theme = savedTheme;
  themeToggle.setAttribute("aria-pressed", savedTheme === "dark");
}

themeToggle.addEventListener("click", () => {
  const currentTheme = document.documentElement.dataset.theme;

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = newTheme;

  localStorage.setItem("theme", newTheme);

  themeToggle.setAttribute("aria-pressed", newTheme === "dark");
});
