const Tower = require("./towers/tower");
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

const flintImg = document.getElementById("flint");
const allTowerPrices = document.getElementsByClassName("tower-price");
const earthTowerPrice = document.getElementById("earth-tower-price");
const waterTowerPrice = document.getElementById("water-tower-price");
const fireTowerPrice = document.getElementById("fire-tower-price");

const waveCounterEle = document.getElementById("wave-counter");
const towerButtons = [...document.getElementById("towers-pane").children];
const flintBankEle = document.getElementById("flint-bank");
const waveButton = document.getElementById("wave-button");
const messagesEle = document.getElementById("messages");

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
    this.message = "";

    this.initializeControlPanel = this.initializeControlPanel.bind(this);
    this.sendWave = this.sendWave.bind(this);
    this.selectTower = this.selectTower.bind(this);
    this.followMouse = this.followMouse.bind(this);
    this.placeTower = this.placeTower.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.showRangeIndicator = this.showRangeIndicator.bind(this);

    this.initializeControlPanel();
    document.addEventListener("mousemove", this.followMouse);
  }

  initializeControlPanel() {
    flintBankEle.innerHTML = `<img class="bank-flint-img" src="./assets/flint/Flint.png"/> ${this.game.flint}`;
    waveButton.addEventListener("click", this.sendWave);
    towerButtons.forEach( towerButton => towerButton.addEventListener("click", this.selectTower) );
  }

  updateControlPanel() {
    waveCounterEle.innerText = `Wave ${this.game.wave}`;
    
    flintBankEle.innerHTML = `<img class="bank-flint-img" src="./assets/flint/Flint.png"/> ${this.game.flint}`;

    if (this.game.waveProgress === "complete") {
      waveButton.style.opacity = 1;
      waveButton.style.pointerEvents = "all";
    } else {
      waveButton.style.opacity = 0.5;
      waveButton.style.pointerEvents = "none";
    }

    messagesEle.innerText = this.message;

    towerButtons.forEach( towerButton => {
      const towerClass = AllTowers[towerButton.id];
      if (this.game.flint < towerClass.FLINT) {
        towerButton.style.opacity = 0.75;
      } else {
        towerButton.style.opacity = 1;
      }
    });

    earthTowerPrice.innerHTML = `<img class="tower-flint-img" src="./assets/flint/Flint.png"/> ${EarthTower.FLINT}`;
    earthTowerPrice.style.color = this.game.flint < EarthTower.FLINT ? "red" : "white";
    waterTowerPrice.innerHTML = `<img class="tower-flint-img" src="./assets/flint/Flint.png"/> ${WaterTower.FLINT}`;
    waterTowerPrice.style.color = this.game.flint < WaterTower.FLINT ? "red" : "white";
    fireTowerPrice.innerHTML = `<img class="tower-flint-img" src="./assets/flint/Flint.png"/> ${FireTower.FLINT}`;
    fireTowerPrice.style.color = this.game.flint < FireTower.FLINT ? "red" : "white";
  }

  sendWave() {
    this.game.sendWave();
  }

  selectTower(event) {
    if (!this.selectedTowerType) {
      this.selectedTowerType = event.currentTarget.id;
      const towerClass = AllTowers[this.selectedTowerType];
      if (this.game.flint < towerClass.FLINT) {
        this.selectedTowerType = null;
        this.message = "You do not have enough flint!";
        setTimeout(() => {
          this.message = "";
        }, 4000);
      } else {
        selectedTowerImgEle.src = AllTowerImgs[this.selectedTowerType];
        this.followMouse(event)
    
        setTimeout(() => {
          document.addEventListener("click", this.handleClick);
        }, 50);
      }
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
    const rect = this.canvasEl.getBoundingClientRect();
    // subtract 15 because the border thickness is 15
    const x = event.clientX - rect.left - 15;
    const y = event.clientY - rect.top - 15;
    return [x, y];
  }

  placeTower(event) {
    const pos = this.getCursorPosition(event);
    const options = { pos, game: this.game };
    const TowerClass = AllTowers[this.selectedTowerType];

    this.game.add( new TowerClass(options) );

    const domTowerImg = document.createElement("IMG");
    domTowerImg.src = selectedTowerImgEle.src;
    domTowerImg.className = "dom-tower-img";
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