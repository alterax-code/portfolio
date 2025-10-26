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