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
    // this.showRangeIndicator = this.showRangeIndicator.bind(this);

    this.initializeControlPanel();
    // document.addEventListener("mousemove", this.followMouse);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 350, 1065);
    this.background(ctx);
    this.towerButtons(ctx);

  }

  background(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 350, 1065);
    ctx.beginPath();
    // 7.5 because the line width is 15
    ctx.rect(7.5, 7.5, 335, 1035);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  towerButtons(ctx) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 5;
    ctx.fillStyle = "#358000";
    this.roundRect(ctx, 80, 125, 190, 205, {tlr: 20}, true);
    ctx.fillStyle = "#004191";
    this.roundRect(ctx, 80, 350, 190, 205, {tlr: 20}, true);
    ctx.fillStyle = "#7d0000";
    this.roundRect(ctx, 80, 575, 190, 205, {tlr: 20}, true);
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    this.roundRect(ctx, 80, 290, 190, 40, {tlr: 0, trr: 0, brr: 20, blr: 20}, true);
    this.roundRect(ctx, 80, 515, 190, 40, {tlr: 0, trr: 0, brr: 20, blr: 20}, true);
    this.roundRect(ctx, 80, 740, 190, 40, {tlr: 0, trr: 0, brr: 20, blr: 20}, true);

    ctx.translate(175, 207.5);
    ctx.drawImage(earthTowerImg, -earthTowerImg.width * 0.5, -earthTowerImg.height * 0.5,);
    ctx.translate(0, 225);
    ctx.drawImage(waterTowerImg, -waterTowerImg.width * 0.5, -waterTowerImg.height * 0.5,);
    ctx.translate(0, 225);
    ctx.drawImage(fireTowerImg, -fireTowerImg.width * 0.5, -fireTowerImg.height * 0.5,);
    ctx.translate(-175, -657.5);
  }


  roundRect(ctx, x, y, w, h, radiusOptions, fill = false, stroke = true) {
    let { tlr = 5, trr = tlr, brr = tlr, blr = tlr } = radiusOptions;
    const r = x + w;
    const b = y + h;
    ctx.beginPath();
    ctx.moveTo(x + tlr, y);
    ctx.lineTo(r - trr, y);
    ctx.quadraticCurveTo(r, y, r, y + trr);
    ctx.lineTo(r, y + h - brr);
    ctx.quadraticCurveTo(r, b, r - brr, b);
    ctx.lineTo(x + blr, b);
    ctx.quadraticCurveTo(x, b, x, b - blr);
    ctx.lineTo(x, y + tlr);
    ctx.quadraticCurveTo(x, y, x + tlr, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  initializeControlPanel() {
    // flintBankEle.innerHTML = `<img class="bank-flint-img" src="./assets/flint/Flint.png"/> ${this.game.flint}`;
    // waveButton.addEventListener("click", this.sendWave);
    // towerButtons.forEach(towerButton => towerButton.addEventListener("click", this.selectTower));
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

    towerButtons.forEach(towerButton => {
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

    this.game.add(new TowerClass(options));

    // const domTowerImg = document.createElement("IMG");
    // domTowerImg.src = selectedTowerImgEle.src;
    // domTowerImg.className = "dom-tower-img";
    // const domTower = document.createElement("DIV");
    // domTower.className = "dom-tower";
    // domTower.id = `${this.selectedTowerType}-dom-tower`;
    // domTower.appendChild(domTowerImg);
    // domTower.style.left = `${event.pageX}px`;
    // domTower.style.top = `${event.pageY}px`;
    // domTower.style.width = "0px";
    // domTower.style.height = "0px";

    // document.body.appendChild(domTower);
    // domTowerImg.addEventListener("click", this.showRangeIndicator);
  }

  // showRangeIndicator(event) {
  //   const domTower = event.currentTarget.parentNode;
  //   const domTowerType = domTower.id.replace("-dom-tower", "");
  //   const towerRange = AllTowers[domTowerType].RANGE;
  //   if (!domTower.className.includes("dom-tower-selected")) {
  //     domTower.className += " dom-tower-selected";
  //     domTower.style.width = `${2 * towerRange}px`;
  //     domTower.style.height = `${2 * towerRange}px`;
  //     domTower.style.left = `calc(${domTower.style.left} - ${towerRange}px)`;
  //     domTower.style.top = `calc(${domTower.style.top} - ${towerRange}px)`;

  //     const hideRangeIndicator = function(event) {
  //       domTower.className = domTower.className.replace(" dom-tower-selected", "");
  //       domTower.style.width = "0px";
  //       domTower.style.height = "0px";
  //       domTower.style.left = `calc(${domTower.style.left} + ${towerRange}px)`;
  //       domTower.style.top = `calc(${domTower.style.top} + ${towerRange}px)`;
  //       document.removeEventListener("click", hideRangeIndicator);
  //     };

  //     setTimeout(() => {
  //       document.addEventListener("click", hideRangeIndicator);
  //     }, 50);
  //   }
  // }
}

module.exports = UI;