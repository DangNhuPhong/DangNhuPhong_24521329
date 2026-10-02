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

/* ========================================
   EXERCISE 3
   CONTACT FORM
   ======================================== */

const contactForm = document.querySelector("#contact-form");

const formStatus = document.querySelector("#form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  formStatus.textContent = "Your message has been submitted successfully.";

  contactForm.reset();
});

/* ========================================
   EXERCISE 4
   T-03A COMPONENT SKELETON
   ======================================== */

const projectList = document.querySelector("#project-list");
const projectEmpty = document.querySelector("#project-empty");
const projectError = document.querySelector("#project-error");

function renderProjects(projects) {
  projectList.replaceChildren();

  projectEmpty.hidden = true;
  projectError.hidden = true;

  if (!Array.isArray(projects)) {
    projectError.hidden = false;
    return;
  }

  if (projects.length === 0) {
    projectEmpty.hidden = false;
    return;
  }

  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-item";

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const link = document.createElement("a");
    link.href = project.url;
    link.textContent = "View Project";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    article.append(title, description, link);
    projectList.append(article);
  });
}
/* ========================================
   T-03B LIVE DATA
   ======================================== */
const projectData = [
  {
    title: "Portfolio Website",
    description: "A responsive developer portfolio built with HTML and CSS.",
    url: "#projects",
  },
  {
    title: "Support Chat",
    description: "A real-time support chat application.",
    url: "#contact",
  },
  {
    title: "Student Management",
    description: "A web application for managing student information.",
    url: "#about",
  },
];
renderProjects(projectData);
