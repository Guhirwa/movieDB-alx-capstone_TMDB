// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (themeToggle) {
    themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// ==================== MOBILE MENU ====================
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileNav = document.getElementById("mobileNav");

if (mobileMenuBtn && mobileNav) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active");
    mobileMenuBtn.textContent = mobileNav.classList.contains("active")
      ? "✕"
      : "☰";
  });
}

// ==================== SEARCH FUNCTIONALITY ====================
const clearSearch = document.getElementById("clearSearch");
const searchInput = document.querySelector(".search-bar-inline .search-input");

if (clearSearch && searchInput) {
  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    searchInput.focus();
  });
}

// ==================== FILTER FUNCTIONALITY ====================
const resetFilters = document.getElementById("resetFilters");
const filterSelects = document.querySelectorAll(".filter-select");

if (resetFilters) {
  resetFilters.addEventListener("click", () => {
    filterSelects.forEach((select) => {
      select.selectedIndex = 0;
    });
  });
}

// ==================== TRAILER MODAL ====================
const watchTrailerBtn = document.getElementById("watchTrailer");
const trailerModal = document.getElementById("trailerModal");
const closeModal = document.getElementById("closeModal");
const trailerFrame = document.getElementById("trailerFrame");

// Sample trailer URL (Oppenheimer trailer)
const trailerUrl = "https://www.youtube.com/embed/uYPbbksJxIg";

if (watchTrailerBtn && trailerModal) {
  watchTrailerBtn.addEventListener("click", () => {
    trailerModal.classList.add("active");
    if (trailerFrame) {
      trailerFrame.src = trailerUrl;
    }
  });
}

if (closeModal && trailerModal) {
  closeModal.addEventListener("click", () => {
    trailerModal.classList.remove("active");
    if (trailerFrame) {
      trailerFrame.src = "";
    }
  });

  // Close modal on outside click
  trailerModal.addEventListener("click", (e) => {
    if (e.target === trailerModal) {
      trailerModal.classList.remove("active");
      if (trailerFrame) {
        trailerFrame.src = "";
      }
    }
  });
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    trailerModal &&
    trailerModal.classList.contains("active")
  ) {
    trailerModal.classList.remove("active");
    if (trailerFrame) {
      trailerFrame.src = "";
    }
  }
});

// ==================== WATCHLIST FUNCTIONALITY ====================
const addToWatchlistBtn = document.getElementById("addToWatchlist");

if (addToWatchlistBtn) {
  // Check if movie is already in watchlist
  const movieId = new URLSearchParams(window.location.search).get("id") || "1";
  const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

  if (watchlist.includes(movieId)) {
    addToWatchlistBtn.textContent = "✓ In Watchlist";
    addToWatchlistBtn.classList.add("added");
  }

  addToWatchlistBtn.addEventListener("click", () => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist") || "[]");

    if (watchlist.includes(movieId)) {
      // Remove from watchlist
      const index = watchlist.indexOf(movieId);
      watchlist.splice(index, 1);
      addToWatchlistBtn.textContent = "+ Add to Watchlist";
      addToWatchlistBtn.classList.remove("added");
    } else {
      // Add to watchlist
      watchlist.push(movieId);
      addToWatchlistBtn.textContent = "✓ In Watchlist";
      addToWatchlistBtn.classList.add("added");
    }

    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ==================== LAZY LOADING IMAGES ====================
const images = document.querySelectorAll(".movie-poster img, .cast-photo");

if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => {
    if (img.dataset.src) {
      imageObserver.observe(img);
    }
  });
}

// ==================== ANIMATION ON SCROLL ====================
const animateOnScroll = () => {
  const elements = document.querySelectorAll(
    ".movie-card, .cast-card, .info-card"
  );

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 100) {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }
  });
};

// Initial animation styles
document
  .querySelectorAll(".movie-card, .cast-card, .info-card")
  .forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

// Run on load and scroll
window.addEventListener("load", animateOnScroll);
window.addEventListener("scroll", animateOnScroll);

console.log("🎬 MovieDB Website Loaded Successfully!");
