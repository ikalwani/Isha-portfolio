const rotatingText = document.getElementById("rotating-text");
const texts = ["Software Engineering", "Web development", "Constantly Growing", "Making Impact"];
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
