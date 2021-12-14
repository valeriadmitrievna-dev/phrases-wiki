const langLabel = document.getElementById("lang_label");
const langBody = document.getElementById("lang_body");

langLabel.addEventListener("click", () => {
  langBody.classList.toggle("visible");
});
