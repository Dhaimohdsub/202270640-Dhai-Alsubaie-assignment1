// ===== Theme Toggle (Dark/Light) =====
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme ? savedTheme : "dark");

themeToggle.addEventListener("click", () => {
  const current = root.getAttribute("data-theme");
  applyTheme(current === "light" ? "dark" : "light");
});

// ===== Greeting by Time of Day =====
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();

let message = "Hello!";
if (hour >= 5 && hour < 12) message = "Good morning ☀️";
else if (hour >= 12 && hour < 18) message = "Good afternoon 🌤️";
else message = "Good evening 🌙";

greeting.textContent = message;

// ===== Footer Year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link (mobile UX)
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===== Contact Form: simple validation + success message =====
const form = document.getElementById("contactForm");
const notice = document.getElementById("formNotice");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function setError(el, msg) {
  el.textContent = msg;
}

function isValidEmail(email) {
  // Simple email check (sufficient for front-end validation)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  notice.textContent = "";

  let ok = true;

  if (nameInput.value.trim().length < 2) {
    setError(nameError, "Please enter your name (at least 2 characters).");
    ok = false;
  } else setError(nameError, "");

  if (!isValidEmail(emailInput.value.trim())) {
    setError(emailError, "Please enter a valid email address.");
    ok = false;
  } else setError(emailError, "");

  if (messageInput.value.trim().length < 10) {
    setError(messageError, "Message should be at least 10 characters.");
    ok = false;
  } else setError(messageError, "");

  if (ok) {
    notice.textContent = "✅ Message sent (demo). No backend connected.";
    form.reset();
  }
});
