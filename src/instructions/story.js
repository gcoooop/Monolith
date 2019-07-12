const instructionsEle = document.getElementById("instructions-window");
const instructionsButton = document.getElementById("story-button");
const storyEle = document.getElementById("story-window");
const storyButton = document.getElementById("story-button");
const xButton = document.getElementById("x-button");

const showInstructionsWindow = () => {
  instructionsEle.className = instructionsEle.className.replace("-hide", "-show");
};

const hideInstructionsWindow = () => {
  instructionsEle.className = instructionsEle.className.replace("-show", "-hide");
};

const showstory = event => {
  showInstructionsWindow();
};

storyButton.addEventListener("click", showstory);
xButton.addEventListener("click", hideInstructionsWindow);