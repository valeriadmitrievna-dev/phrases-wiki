const langLabel = document.getElementById("lang_label");
const langBody = document.getElementById("lang_body");
const burgerIcon = document.getElementById("burger");
const burgerBody = document.getElementById("burger_body");
const closeButtons = [...document.querySelectorAll(".close")];

const controlScroll = stop => {
  if (stop) {
    document.querySelector("html").style.overflowY = "hidden";
    document.querySelector("body").style.overflowY = "hidden";
  } else {
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector("body").style.overflowY = "auto";
  }
};

langLabel.addEventListener("click", () => {
  langBody.style.transition = "0.3s";
  langBody.classList.toggle("visible");
  if (window.screen.width <= 640) {
    controlScroll([...langBody.classList].includes("visible"));
  }
});

burgerIcon.addEventListener("click", () => {
  burgerBody.style.transition = "0.3s";
  burgerBody.classList.toggle("visible");
  controlScroll([...burgerBody.classList].includes("visible"));
});

closeButtons.forEach(button => {
  button.onclick = () => {
    langBody.classList.remove("visible");
    burgerBody.classList.remove("visible");
    controlScroll(false);
  };
});
