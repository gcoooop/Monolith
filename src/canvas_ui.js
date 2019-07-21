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

class UI {
  constructor(game) {
    this.game = game;
    this.selectedTowerType = null;
    this.message = "";
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 350, 1065);
    ctx.translate(1500, 150);
    this.background(ctx);
    this.towerButtons(ctx);
    this.towerPrices(ctx);
    
    ctx.translate(-1500, -150);
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
    ctx.drawImage(earthTowerImg, -earthTowerImg.width * 0.5, -earthTowerImg.height * 0.5);
    ctx.translate(0, 225);
    ctx.drawImage(waterTowerImg, -waterTowerImg.width * 0.5, -waterTowerImg.height * 0.5);
    ctx.translate(0, 225);
    ctx.drawImage(fireTowerImg, -fireTowerImg.width * 0.5, -fireTowerImg.height * 0.5);
    ctx.translate(-175, -657.5);
  }

  towerPrices(ctx) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "24px Arial";
    ctx.fillStyle = this.game.flint < EarthTower.FLINT ? "red" : "white";
    ctx.fillText(EarthTower.FLINT, 175, 310);
    ctx.fillStyle = this.game.flint < WaterTower.FLINT ? "red" : "white";
    ctx.fillText(WaterTower.FLINT, 175, 535);
    ctx.fillStyle = this.game.flint < FireTower.FLINT ? "red" : "white";
    ctx.fillText(FireTower.FLINT, 175, 760);
    
    ctx.translate(140, 310);
    ctx.scale(1.5, 1.5);
    ctx.drawImage(flintImg, -flintImg.width * 0.5, -flintImg.height * 0.5);
    ctx.scale(1 / 1.5, 1 / 1.5);
    ctx.translate(0, 225);
    ctx.scale(1.5, 1.5);
    ctx.drawImage(flintImg, -flintImg.width * 0.5, -flintImg.height * 0.5);
    ctx.scale(1 / 1.5, 1 / 1.5);
    ctx.translate(0, 225);
    ctx.scale(1.5, 1.5);
    ctx.drawImage(flintImg, -flintImg.width * 0.5, -flintImg.height * 0.5);
    ctx.scale(1 / 1.5, 1 / 1.5);
    ctx.translate(-140, -760);
  }

  attackButton(ctx) {
    this.fillStyle = "red";
    this.roundRect(ctx, x, y, 135, 50, {tlr: 15}, true);
    
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
}

module.exports = UI;