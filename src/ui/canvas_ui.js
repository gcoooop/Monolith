const UIElements = require("./ui_elements");

const Tower = require("../towers/tower");
const EarthTower = require("../towers/earth_tower");
const WaterTower = require("../towers/water_tower");
const FireTower = require("../towers/fire_tower");

const gameContainer = document.getElementById("monolith-game");

const AllTowers = {
  earth: EarthTower,
  water: WaterTower,
  fire: FireTower
};

const earthTowerImg = document.getElementById("earth-tower");
const waterTowerImg = document.getElementById("water-tower");
const fireTowerImg = document.getElementById("fire-tower");

const flintImg = document.getElementById("flint");

class UI {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.scale = 1;
    this.selectedTowerType = null;
    this.message = "";
    this.cursorPos = [0, 0];
    this.isHovering = false;

    this.setScale = this.setScale.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.checkHover = this.checkHover.bind(this);
    gameContainer.addEventListener("click", this.handleClick);
    gameContainer.addEventListener("mousemove", this.getCursorPosition);
    this.draw()
  }

  // draw(ctx) {
  //   ctx.clearRect(0, 0, 350, 1065);
  //   ctx.translate(1500, 150);
  //   this.background(ctx);
  //   this.towerButtons(ctx);
  //   this.towerPrices(ctx);
    
  //   ctx.translate(-1500, -150);
  // }

  draw(ctx = this.ctx) {
    ctx.clearRect(0, 0, 350, 1065);
    this.background(ctx);
    this.drawUIElements(ctx);
  }

  drawUIElements(ctx, eles = UIElements) {
    Object.values(eles).forEach(ele => {
      switch (ele.type) {
        case "image":
          this.drawImage(ctx, ele);
          break;
        case "roundRect":
          this.drawRoundRect(ctx, ele);
          break;
        case "text":
          this.drawText(ctx, ele);
          break;
        default:
          break;
      }
      if (ele.innerObjs) {
        this.drawUIElements(ctx, ele.innerObjs);
      }
    });
  }

  setScale(scale) {
    this.scale = scale;
  }

  handleClick(event) {
    // const pos = this.getCursorPosition(event);
    this.draw();
  }

  getCursorPosition(event) {
    this.isHovering = false;
    const rect = gameContainer.getBoundingClientRect();
    const x = (event.clientX - rect.left) / this.scale;
    const y = (event.clientY - rect.top) / this.scale;

    this.cursorPos = [x, y];
    this.draw();
    if (this.isHovering) {
      gameContainer.style.cursor = "pointer";
    } else {
      gameContainer.style.cursor = "default";
    }
  }

  background(ctx) {
    ctx.fillStyle = "gray";
    ctx.fillRect(1500, 150, 350, 1065);
    ctx.beginPath();
    // 7.5 because the line width is 15
    ctx.rect(1507.5, 157.5, 335, 1035);
    ctx.lineWidth = 15;
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  drawImage(ctx, ele) {
    ctx.translate(ele.x, ele.y);
    if (ele.s) {
      ctx.scale(ele.s, ele.s);
      ctx.drawImage(ele.image, ele.dx, ele.dy);
      ctx.scale(1 / ele.s, 1 / ele.s);
    } else {
      ctx.drawImage(ele.image, ele.dx, ele.dy);
    }
    ctx.translate(-ele.x, -ele.y);
  }

  // drawRoundRect(ctx, x, y, w, h, radiusOptions, fill = null, stroke = "black", lineW = 1) {
  drawRoundRect(ctx, ele) {
    const {x, y, w, h, f, hF, s, lw} = ele;
    const radiusOptions = ele.r;
    let tlr, trr, brr, blr;
    if (typeof radiusOptions === "number") {
      tlr = trr = brr = blr = radiusOptions;
    } else {
      tlr = radiusOptions.tlr;
      trr = radiusOptions.trr || tlr;
      brr = radiusOptions.brr || tlr;
      blr = radiusOptions.blr || tlr;
    }

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

    if (f) {
      if (this.checkHover(ele) && ele.tag === "button") {
        this.isHovering = true;
        ctx.fillStyle = hF;
      } else {
        // gameContainer.style.cursor = "default";
        ctx.fillStyle = f;
      }
      ctx.fill();
    }

    if (s) {
      ctx.lineWidth = lw;
      ctx.strokeStyle = s;
      ctx.stroke();
    }
  }

  drawText(ctx, ele) {
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (typeof ele.f === "function") {
      ctx.fillStyle = ele.f(this.game);
    } else {
      ctx.fillStyle = ele.f;
    }
    ctx.font = ele.font;
    ctx.fillText(ele.text, ele.x, ele.y)
  }

  checkHover(ele) {
    return this.cursorPos[0] >= ele.x 
    && this.cursorPos[0] <= ele.x + ele.w 
    && this.cursorPos[1] >= ele.y 
    && this.cursorPos[1] <= ele.y + ele.h;
  }

  attackButton(ctx) {
    this.fillStyle = "red";
    this.roundRect(ctx, x, y, 135, 50, {tlr: 15}, true);
  }
}

module.exports = UI;