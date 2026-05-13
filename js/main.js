const refs = {
  body: document.body,
  header: document.querySelector(".header"),
  openModalBtn: document.querySelector("[data-modal-open]"),
  closeModalBtn: document.querySelector("[data-modal-close]"),
  modalOverlay: document.querySelector("[data-modal]"),
  themeToggle: document.querySelector(".theme-toggle"),
  burgerBtn: document.querySelector(".burger-btn"),
  mobileMenu: document.querySelector(".mobile-menu"),
  mobileMenuCloseBtn: document.querySelector(".mobile-menu-close"),
  navLinks: document.querySelectorAll(
    '.menu a[href^="#"], .mobile-menu a[href^="#"], .header-logo[href^="#"]',
  ),
};

function openModal() {
  if (!refs.modalOverlay) return;
  refs.modalOverlay.classList.add("is-open");
  refs.body.classList.add("no-scroll");
}

function closeModal() {
  if (!refs.modalOverlay) return;
  refs.modalOverlay.classList.remove("is-open");
  refs.body.classList.remove("no-scroll");
}

function onEscKeyPress(event) {
  if (event.key === "Escape") {
    if (refs.modalOverlay && refs.modalOverlay.classList.contains("is-open")) {
      closeModal();
    }

    if (refs.mobileMenu && refs.mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();
    }
  }
}

function openMobileMenu() {
  if (!refs.mobileMenu) return;
  refs.mobileMenu.classList.add("is-open");
  refs.body.classList.add("no-scroll");
}

function closeMobileMenu() {
  if (!refs.mobileMenu) return;
  refs.mobileMenu.classList.remove("is-open");

  if (!refs.modalOverlay || !refs.modalOverlay.classList.contains("is-open")) {
    refs.body.classList.remove("no-scroll");
  }
}

function setTheme(theme) {
  const isDark = theme === "dark";
  refs.body.classList.toggle("dark-theme", isDark);

  if (refs.themeToggle) {
    refs.themeToggle.textContent = isDark ? "Light" : "Dark";
    refs.themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
  }
}

if (refs.openModalBtn) {
  refs.openModalBtn.addEventListener("click", openModal);
}

if (refs.closeModalBtn) {
  refs.closeModalBtn.addEventListener("click", closeModal);
}

if (refs.modalOverlay) {
  refs.modalOverlay.addEventListener("click", (event) => {
    if (event.target === refs.modalOverlay) {
      closeModal();
    }
  });
}

if (refs.burgerBtn) {
  refs.burgerBtn.addEventListener("click", openMobileMenu);
}

if (refs.mobileMenuCloseBtn) {
  refs.mobileMenuCloseBtn.addEventListener("click", closeMobileMenu);
}

refs.navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || !targetId.startsWith("#")) return;

    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    event.preventDefault();

    const headerHeight = refs.header ? refs.header.offsetHeight : 0;
    const targetPosition =
      targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });

    if (refs.mobileMenu && refs.mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();
    }
  });
});

if (refs.themeToggle) {
  let currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  setTheme(currentTheme);

  refs.themeToggle.addEventListener("click", () => {
    currentTheme = refs.body.classList.contains("dark-theme")
      ? "light"
      : "dark";

    setTheme(currentTheme);
  });
}

document.addEventListener("keydown", onEscKeyPress);
