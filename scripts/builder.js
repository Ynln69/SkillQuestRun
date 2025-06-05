const getRelativePath = (file) => {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  let prefix = "";

  if (pathParts.includes("pages")) {
    prefix = "../";
  } else {
    prefix = "./";
  }

  return prefix + file;
};

const loadHTML = (url, selector, callback) => {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.querySelector(selector).innerHTML = html;
      if (callback) callback();
    })
    .catch((error) => {
      console.error(error);
    });
};

const setActiveLink = () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a, .mobile-menu a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href").replace("./", "").replace("../", "");
    if (href === currentPage || (href === "index.html" && currentPage === "")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
};

const updateNavLinks = () => {
  document.querySelectorAll("nav a, .mobile-menu a").forEach((link) => {
    const originalHref = link.getAttribute("href");
    if (
      originalHref &&
      !originalHref.startsWith("http") &&
      !originalHref.startsWith("#")
    ) {
      link.setAttribute("href", getRelativePath(originalHref));
    }
  });
};

// Завантаження Header
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

  updateNavLinks();
  setActiveLink();
}); // <-- Ось тут закриття

// Завантаження Footer
loadHTML(getRelativePath("footer.html"), ".footer", () => {
  updateNavLinks();
});
