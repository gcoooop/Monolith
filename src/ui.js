const EarthTower = require("./towers/earth_tower");
const WaterTower = require("./towers/water_tower");
const FireTower = require("./towers/fire_tower");

const AllTowers = {
  earth: EarthTower,
  water: WaterTower,
  fire: FireTower
};

class UI {
  constructor(canvasEl, game) {
    this.canvasEl = canvasEl;
    this.selectedTowerEle = document.getElementById("selected-tower");
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
    this.selectedTowerEle.style.left = `calc(${event.pageX}px - 50px)`;
    this.selectedTowerEle.style.top = `calc(${event.pageY}px - 50px)`;
  }

  initializeControlPanel() {
    const towerButtons = [...document.getElementById("towers-pane").children];
    towerButtons.forEach( towerButton => towerButton.addEventListener("click", this.selectTower) );
  }

  selectTower(event) {
    event.stopPropagation();
    this.selectedTowerType = event.currentTarget.id;

    const towerImgEle = document.getElementById(`${this.selectedTowerType}-tower`)
    this.selectedTowerEle.src = towerImgEle.src;
    
    document.addEventListener("click", this.handleClick);
  }

  handleClick(event) {
    if (event.target.nodeName === "CANVAS") {
      this.placeTower(event);
    } 
    document.removeEventListener("click", this.handleClick);
    this.selectedTowerEle.src = "";
  }

  placeTower(event) {
    const pos = [ event.offsetX - 50, event.offsetY - 50 ];
    const options = { pos };
    this.game.add( new AllTowers[this.selectedTowerType](options) );
  }
}

module.exports = UI;