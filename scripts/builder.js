const getRelativePath = (file) => {
  const pathDepth = window.location.pathname.split("/").length - 2;
  let prefix = "";
  for (let i = 0; i < pathDepth; i++) {
    prefix += "../";
  }
  return prefix + file;
};

const loadHTML = (url, selector, callback) => {
  fetch(url)
    .then((response) => response.text())
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (callback) callback();
    });
};

const setActiveLink = () => {
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a, .mobile-menu a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace("./", "");
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

loadHTML(getRelativePath("header.html"), ".site-header", () => {
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (burger && mobileMenu && closeMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.add("open");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(e.target) &&
        e.target !== burger
      ) {
        mobileMenu.classList.remove("open");
      }
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobileMenu.classList.remove("open");
      }
    });
  }

  setActiveLink();
});

// Завантаження Footer
loadHTML(getRelativePath("footer.html"), ".footer");
