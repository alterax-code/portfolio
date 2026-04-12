const typingText = document.getElementById("typing-text");
const textToType = "JACOB Lucas";
let index = 0;

function typeWriter() {
  if (index < textToType.length) {
    typingText.textContent += textToType.charAt(index);
    index++;
    setTimeout(typeWriter, 150);
  }
}

window.addEventListener("load", typeWriter);

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const fadeElements = document.querySelectorAll(".fade-in");

function checkVisibility() {
  fadeElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

const modal = document.getElementById("cvModal");
const viewCvBtn = document.getElementById("viewCvBtn");
const closeBtn = document.querySelector(".close-modal");

viewCvBtn.addEventListener("click", function () {
  console.log('Bouton "Voir CV" cliqué !');
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", function () {
  console.log("Bouton X cliqué !");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    console.log("Clic en dehors de l'image !");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && modal.style.display === "block") {
    console.log("Touche ECHAP pressée !");
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

function initCarousel(containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  var viewport = container.querySelector(".carousel-viewport");
  var track = container.querySelector(".carousel-track");
  var cards = Array.from(track.querySelectorAll(".carousel-card"));
  var dotsContainer = container.querySelector(".carousel-dots");
  var prevBtn = container.querySelector(".carousel-arrow-prev");
  var nextBtn = container.querySelector(".carousel-arrow-next");

  var currentIndex = 0;
  var touchStartX = 0;

  function getCardsPerView() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 576) return 2;
    return 1;
  }

  function getTotalPages() {
    return Math.ceil(cards.length / getCardsPerView());
  }

  function setCardWidths() {
    var perView = getCardsPerView();
    var cardWidth = viewport.offsetWidth / perView;
    cards.forEach(function (card) {
      card.style.width = cardWidth + "px";
    });
  }

  function buildDots() {
    dotsContainer.innerHTML = "";
    var total = getTotalPages();
    for (var i = 0; i < total; i++) {
      var dot = document.createElement("button");
      dot.className = "carousel-dot" + (i === currentIndex ? " active" : "");
      dot.setAttribute("aria-label", "Page " + (i + 1));
      (function (idx) {
        dot.addEventListener("click", function () { goTo(idx); });
      })(i);
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    dotsContainer.querySelectorAll(".carousel-dot").forEach(function (dot, i) {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  function updateArrows() {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= getTotalPages() - 1;
  }

  function goTo(index) {
    var total = getTotalPages();
    currentIndex = Math.max(0, Math.min(index, total - 1));
    track.style.transform = "translateX(-" + (currentIndex * viewport.offsetWidth) + "px)";
    updateDots();
    updateArrows();
  }

  prevBtn.addEventListener("click", function () { goTo(currentIndex - 1); });
  nextBtn.addEventListener("click", function () { goTo(currentIndex + 1); });

  viewport.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  viewport.addEventListener("touchend", function (e) {
    var diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
    }
  }, { passive: true });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      setCardWidths();
      buildDots();
      goTo(0);
    }, 150);
  });

  setCardWidths();
  buildDots();
  goTo(0);
}

window.addEventListener("load", function () {
  initCarousel("skills-carousel");
  initCarousel("projects-carousel");
});