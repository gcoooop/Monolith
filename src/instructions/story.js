const instructionsEle = document.getElementById("instructions-window");
const backgroundEle = document.getElementById("background-window");
const backgroundButton = document.getElementById("background-button");
const xButton = document.getElementById("x-button");

const showBackground = event => {
  backgroundButton.removeEventListener("click", showBackground);
  xButton.addEventListener("click", closeBackground);
  instructionsEle.className = instructionsEle.className.replace("-hide", "-show");
  backgroundEle.className = backgroundEle.className.replace("-hide", "-show");
};

const closeBackground = event => {
  xButton.removeEventListener("click", closeBackground);
  backgroundButton.addEventListener("click", showBackground);
  instructionsEle.className = instructionsEle.className.replace("-show", "-hide");
  backgroundEle.className = backgroundEle.className.replace("-show", "-hide");
};

backgroundButton.addEventListener("click", showBackground);
