const EarthTower = require("./towers/earth_tower");
const WaterTower = require("./towers/water_tower");
const FireTower = require("./towers/fire_tower");

const AllTowers = {
  earth: EarthTower,
  water: WaterTower,
  fire: FireTower
};

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

    this.initializeControlPanel();
    document.addEventListener("mousemove", this.followMouse);
  }

  followMouse(event) {
    if (this.selectedTowerType) {
      const towerRange = AllTowers[this.selectedTowerType].RANGE;
      selectedTowerContainerEle.style.left = `calc(${event.pageX}px - ${towerRange}px)`;
      selectedTowerContainerEle.style.top = `calc(${event.pageY}px - ${towerRange}px)`;
      selectedTowerContainerEle.style.height = `${towerRange * 2}px`;
      selectedTowerContainerEle.style.width = `${towerRange * 2}px`;
    }
  }

  initializeControlPanel() {
    const towerButtons = [...document.getElementById("towers-pane").children];
    towerButtons.forEach( towerButton => towerButton.addEventListener("click", this.selectTower) );
  }

  selectTower(event) {
    event.stopPropagation();
    this.selectedTowerType = event.currentTarget.id;
    selectedTowerImgEle.src = AllTowerImgs[this.selectedTowerType];
    this.followMouse(event)

    document.addEventListener("click", this.handleClick);
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

    const style = selectedTowerContainerEle.style;
    const domTowerImg = `<img src="${selectedTowerImgEle.src}"/>`
    const domTower = document.createElement("DIV");
    domTower.id = `dom-tower ${this.selectedTowerType}-dom-tower`;
    domTower.innerHTML = domTowerImg;
    domTower.style.position = "absolute";
    domTower.style.left = style.left;
    domTower.style.top = style.top;
    domTower.style.height = style.height;
    domTower.style.width = style.width;
    domTower.style.background = "rgb(0,0,0,0.5)";
    domTower.style.borderRadius = "50%";
    domTower.style.display = "flex";
    domTower.style.justifyContent = "center";
    domTower.style.alignItems = "center";


    document.body.appendChild(domTower);
  }
}

module.exports = UI;