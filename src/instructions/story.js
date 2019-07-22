const instructionsEle = document.getElementById("instructions-window");
const xButton = document.getElementById("x-button");

const showInstructionsWindow = () => {
  instructionsEle.className = instructionsEle.className.replace("-hide", "-show");
};

const hideInstructionsWindow = () => {
  instructionsEle.className = instructionsEle.className.replace("-show", "-hide");
};

xButton.addEventListener("click", hideInstructionsWindow);

module.exports = { showStory: showInstructionsWindow };