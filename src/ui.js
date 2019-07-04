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
      selectedTowerContainerEle.style.left = `calc(${event.pageX}px - ${towerRange * 0.5}px)`;
      selectedTowerContainerEle.style.top = `calc(${event.pageY}px - ${towerRange * 0.5}px)`;
      selectedTowerContainerEle.style.height = `${towerRange}px`;
      selectedTowerContainerEle.style.width = `${towerRange}px`;
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

  placeTower(event) {
    const pos = [ event.offsetX - 50, event.offsetY - 50 ];
    const options = { pos };
    this.game.add( new AllTowers[this.selectedTowerType](options) );
  }
}

module.exports = UI;