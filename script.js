const rotatingText = document.getElementById("rotating-text");
const texts = ["Software Engineering", "Full Stack Development", "Constantly Growing", "Making Impact"];
let index = 0;

function changeText() {
  rotatingText.style.opacity = 0;
  setTimeout(() => {
    rotatingText.textContent = texts[index];
    rotatingText.style.opacity = 1;
    index = (index + 1) % texts.length;
  }, 500);
}

setInterval(changeText, 3000);
changeText(); 


document.getElementById("menu-toggle").addEventListener("click", function () {
  var headerItems = document.getElementById("header-items");
  headerItems.classList.toggle("show");
});

document.addEventListener("DOMContentLoaded", function () {
  const fadeElems = document.querySelectorAll(".fade-in");

  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  };

  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        appearOnScroll.unobserve(entry.target);
      }
    });
  },
  appearOptions);

  fadeElems.forEach((fadeElem) => {
    appearOnScroll.observe(fadeElem);
  });
});