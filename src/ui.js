const Tower = require("./towers/tower");
const EarthTower = require("./towers/earth_tower");
const WaterTower = require("./towers/water_tower");
const FireTower = require("./towers/fire_tower");

const AllTowers = {
  earth: EarthTower,
  water: WaterTower,
  fire: FireTower
};

const styleSheetEle = document.getElementById("css");
const selectedTowerContainerEle = document.getElementById("selected-tower-container");
const selectedTowerImgEle = document.getElementById("selected-tower-img");

const earthTowerImg = document.getElementById("earth-tower");
const waterTowerImg = document.getElementById("water-tower");
const fireTowerImg = document.getElementById("fire-tower");

const AllTowerImgs = {
  earth: earthTowerImg.src,
  water: waterTowerImg.src,
  fire: fireTowerImg.src
};

class UI {
  constructor(canvasEl, game) {
    this.canvasEl = canvasEl;
    this.game = game;
    this.selectedTowerType = null;

    this.initializeControlPanel = this.initializeControlPanel.bind(this);
    this.selectTower = this.selectTower.bind(this);
    this.followMouse = this.followMouse.bind(this);
    this.placeTower = this.placeTower.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showRangeIndicator = this.showRangeIndicator.bind(this);

    this.initializeControlPanel();
    document.addEventListener("mousemove", this.followMouse);
  }

  initializeControlPanel() {
    const towerButtons = [...document.getElementById("towers-pane").children];
    towerButtons.forEach( towerButton => towerButton.addEventListener("click", this.selectTower) );
  }

  selectTower(event) {
    if (!this.selectedTowerType) {
      this.selectedTowerType = event.currentTarget.id;
      selectedTowerImgEle.src = AllTowerImgs[this.selectedTowerType];
      this.followMouse(event)
  
      setTimeout(() => {
        document.addEventListener("click", this.handleClick);
      }, 50);
    }
  }

  followMouse(event) {
    if (this.selectedTowerType) {
      const towerRange = AllTowers[this.selectedTowerType].RANGE;
      selectedTowerContainerEle.style.left = `${event.pageX - towerRange}px`;
      selectedTowerContainerEle.style.top = `${event.pageY - towerRange}px`;
      selectedTowerContainerEle.style.height = `${towerRange * 2}px`;
      selectedTowerContainerEle.style.width = `${towerRange * 2}px`;
    }
  }

  handleClick(event) {
    if (event.target.nodeName === "CANVAS") {
      this.placeTower(event);
    } 
    document.removeEventListener("click", this.handleClick);
    selectedTowerImgEle.src = "";
    this.selectedTowerType = null;
    selectedTowerContainerEle.style.height = `0px`;
    selectedTowerContainerEle.style.width = `0px`;
  }

  getCursorPosition(event) {
    const rect = this.canvasEl.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    return [x, y];
  }

  placeTower(event) {
    const pos = this.getCursorPosition(event);
    const options = { pos };
    this.game.add( new AllTowers[this.selectedTowerType](options) );

    const domTowerImg = document.createElement("IMG");
    domTowerImg.src = selectedTowerImgEle.src;
    const domTower = document.createElement("DIV");
    domTower.className = "dom-tower";
    domTower.id = `${this.selectedTowerType}-dom-tower`;
    domTower.appendChild(domTowerImg);
    domTower.style.left = `${event.pageX}px`;
    domTower.style.top = `${event.pageY}px`;
    domTower.style.width = "0px";
    domTower.style.height = "0px";

    document.body.appendChild(domTower);
    domTowerImg.addEventListener("click", this.showRangeIndicator);
  }

  showRangeIndicator(event) {
    const domTower = event.currentTarget.parentNode;
    const domTowerType = domTower.id.replace("-dom-tower", "");
    const towerRange = AllTowers[domTowerType].RANGE;
    if (!domTower.className.includes("dom-tower-selected")) {
      domTower.className += " dom-tower-selected";
      domTower.style.width = `${2 * towerRange}px`;
      domTower.style.height = `${2 * towerRange}px`;
      domTower.style.left = `calc(${domTower.style.left} - ${towerRange}px)`;
      domTower.style.top = `calc(${domTower.style.top} - ${towerRange}px)`;

      const hideRangeIndicator = function(event) {
        domTower.className = domTower.className.replace(" dom-tower-selected", "");
        domTower.style.width = "0px";
        domTower.style.height = "0px";
        domTower.style.left = `calc(${domTower.style.left} + ${towerRange}px)`;
        domTower.style.top = `calc(${domTower.style.top} + ${towerRange}px)`;
        document.removeEventListener("click", hideRangeIndicator);
      };

      setTimeout(() => {
        document.addEventListener("click", hideRangeIndicator);
      }, 50);
    }
  }
}

module.exports = UI;