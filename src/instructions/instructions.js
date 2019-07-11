const instructionsEle = document.getElementById("instructions-window");
const instructionsButton = document.getElementById("instructions-button");
const backgroundEle = document.getElementById("background-window");
const backgroundButton = document.getElementById("background-button");
const xButton = document.getElementById("x-button");

const nextButton = document.getElementById("next-button");
const htp1Ele = document.getElementById("htp-1-window");
const htp2Ele = document.getElementById("htp-2-window");
const htp3Ele = document.getElementById("htp-3-window");
const htp4Ele = document.getElementById("htp-4-window");
const htp5Ele = document.getElementById("htp-5-window");
const htp6Ele = document.getElementById("htp-6-window");

const showDOMEle = ele => {
  ele.className = ele.className.replace("-hide", "-show");
};

const hideDOMEle = ele => {
  ele.className = ele.className.replace("-show", "-hide");
};

const showInstructionsWindow = () => {
  showDOMEle(instructionsEle);
  showDOMEle(xButton);
};

const hideInstructionsWindow = () => {
  nextButton.removeEventListener("click", hideInstructionsWindow);
  hideDOMEle(instructionsEle);
  [...instructionsEle.children].forEach(ele => hideDOMEle(ele));
};

xButton.addEventListener("click", hideInstructionsWindow);


const showBackground = event => {
  showInstructionsWindow();
  showDOMEle(backgroundEle);
};

backgroundButton.addEventListener("click", showBackground);


const showHTP1 = event => {
  showInstructionsWindow()
  showDOMEle(htp1Ele);
  showDOMEle(nextButton);
  nextButton.addEventListener("click", showHTP2);
  nextButton.innerText = "Next!";
};

const showHTP2 = event => {
  nextButton.removeEventListener("click", showHTP2);
  hideDOMEle(htp1Ele);
  showDOMEle(htp2Ele);
  nextButton.addEventListener("click", showHTP3);
};

const showHTP3 = event => {
  nextButton.removeEventListener("click", showHTP3);
  hideDOMEle(htp2Ele);
  showDOMEle(htp3Ele);
  nextButton.addEventListener("click", showHTP4);
};
 
const showHTP4 = event => {
  nextButton.removeEventListener("click", showHTP4);
  hideDOMEle(htp3Ele);
  showDOMEle(htp4Ele);
  nextButton.addEventListener("click", showHTP5);
};
 
const showHTP5 = event => {
  nextButton.removeEventListener("click", showHTP6);
  hideDOMEle(htp5Ele);
  showDOMEle(htp6Ele);
  nextButton.innerText = "Let's do this!";
  nextButton.addEventListener("click", hideInstructionsWindow);
};
 

instructionsButton.addEventListener("click", showHTP1);