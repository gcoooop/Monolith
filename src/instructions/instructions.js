const instructionsEle = document.getElementById("instructions-window");
const instructionsButton = document.getElementById("instructions-button");
const backgroundEle = document.getElementById("background-window");
const backgroundButton = document.getElementById("background-button");
const xButton = document.getElementById("x-button");

const showInstructionsWindow = () => {
  instructionsEle.className = instructionsEle.className.replace("-hide", "-show");
};

const hideInstructionsWindow = () => {
  instructionsEle.className = instructionsEle.className.replace("-show", "-hide");
};

const showBackground = event => {
  showInstructionsWindow();
};

backgroundButton.addEventListener("click", showBackground);
xButton.addEventListener("click", hideInstructionsWindow);