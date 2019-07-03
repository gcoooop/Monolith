const EarthTower = require("./towers/fire_tower");
const WaterTower = require("./towers/water_tower");
const FireTower = require("./towers/fire_tower");

class UI {
  constructor(canvasEl, game) {
    this.canvasEl = canvasEl;
    this.selectedTowerEle = document.getElementById("selected-tower");
    this.game = game;
    this.initializeControlPanel();

    // this.selectTower = this.selectTower.bind(this);
    // this.followMouse = this.followMouse.bind(this);
    // this.placeTower = this.placeTower.bind(this);
  }

  initializeControlPanel() {
    const towerButtons = [...document.getElementById("towers-pane").children];
    towerButtons.forEach(towerButton => {
      towerButton.addEventListener("mousedown", this.selectTower.bind(this))
    });
  }

  selectTower(event) {
    const towerType = event.currentTarget.id;
    const towerImgEle = document.getElementById(`${towerType}-tower`)
    this.selectedTowerEle.src = towerImgEle.src;
    
    document.addEventListener("mousemove", this.followMouse.bind(this));

    this.canvasEl.addEventListener("click", this.placeTower.bind(this));
  }

  followMouse(event) {
    this.selectedTowerEle.style.left = `calc(${event.pageX}px - 37.5px)`;
    this.selectedTowerEle.style.top = `calc(${event.pageY}px - 37.5px)`;
  }

  placeTower(event) {
    document.removeEventListener("mousemove", this.followMouse.bind(this));
    this.canvasEl.removeEventListener("click", this.placeTower.bind(this));
    // const towerClass = `${}Tower`
    if (event.target.id === "monolith-canvas") {
      // this.game.add(new )
    }
  }
}

module.exports = UI;