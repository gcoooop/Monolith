const Tower = require("../towers/tower");
const UIElements = require("./ui_elements");
const Story = require("../instructions/story");
const gameContainer = document.getElementById("monolith-game");
const retryButtonContainer = document.getElementById("retry-button-container");

const gillSans = "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif";

class UI {
  constructor(ctx, game, htp) {
    this.ctx = ctx;
    this.game = game;
    this.htp = htp;
    this.scale = 1;
    this.selectedTowerType = null;
    this.message = "";
    this.cursorPos = [0, 0];
    this.hoveredEle = null;
    this.activeEle = null;
    this.towerId = 0;

    this.setScale = this.setScale.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.placeTower = this.placeTower.bind(this);
    // gameContainer.addEventListener("click", this.handleClick);
    // gameContainer.addEventListener("mousemove", this.getCursorPosition);
    document.documentElement.addEventListener("click", this.handleClick);
    document.documentElement.addEventListener("mousemove", this.getCursorPosition);
    this.draw()
  }

  draw(ctx = this.ctx) {
    ctx.clearRect(0, 0, 1850, 1200);
    this.findHoveredElement();
    this.drawUIElements(ctx);
  }

  findHoveredElement(eles = UIElements) {
    Object.values(eles).forEach(ele => {
      if (ele.tag === "button" && this.checkHover(ele)) {
        this.hoveredEle = ele;
      }
      
      if (ele.innerObjs) this.findHoveredElement(ele.innerObjs);
    });
  }

  drawUIElements(ctx, eles = UIElements) {
    Object.values(eles).forEach(ele => {
      switch (ele.type) {
        case "image":
          this.drawImage(ctx, ele);
          break;
        case "rect":
          this.drawRect(ctx, ele);
          break;
        case "roundRect":
          this.drawRoundRect(ctx, ele);
          break;
        case "circle":
          this.drawCircle(ctx, ele);
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

    if (this.selectedTowerType) {
      this.followCursor(ctx);
    }
  }

  setScale(scale) {
    this.scale = scale;
  }

  handleClick(event) {
    if (this.activeEle) {
      this.hideTowerOptions();
    }
    if (this.hoveredEle) {
      switch (this.hoveredEle.a) {
        case "placeTower":
          this.selectTower();
          break;
        case "showTowerOptions":
          this.showTowerOptions();
          break;
        case "sendWave":
          this.sendWave();
          break;
        case "showStory":
          Story.showStory();
          break;
        case "htp":
          this.htp.nextPage("click");
          break;
        default:
          break;
      }
    } else if (this.selectedTowerType) {
      this.isInBounds() ? this.placeTower() : this.cancelTower()
    }
    this.draw();
  }

  getCursorPosition(event) {
    this.hoveredEle = null;
    const rect = gameContainer.getBoundingClientRect();
    const x = (event.clientX - rect.left) / this.scale;
    const y = (event.clientY - rect.top) / this.scale;
    
    this.cursorPos = [x, y];
    this.draw();
    if (this.hoveredEle) {
      gameContainer.style.cursor = "pointer";
    } else {
      gameContainer.style.cursor = "default";
    }
  }

  selectTower() {
    const { tower } = this.hoveredEle;
    if (this.game.flint >= tower.FLINT) {
      this.selectedTowerType = tower;
    } else {
      this.message = "You do not have enough flint!";
      setTimeout(() => {
        this.message = "";
      }, 4000);
    }
  }

  cancelTower() {
    this.selectedTowerType = null;
  }

  followCursor(ctx) {
    const towerRange = {
      x: this.cursorPos[0],
      y: this.cursorPos[1],
      r: this.selectedTowerType.RANGE,
      f: "rgba(0,0,0,0.1)"

    };
    const towerImg = {
      image: this.selectedTowerType.SPRITE,
      x: this.cursorPos[0],
      y: this.cursorPos[1],
      dx: -this.selectedTowerType.SPRITE.width * 0.5,
      dy: -this.selectedTowerType.SPRITE.height * 0.5,
      s: Tower.SCALE
    }
    this.drawCircle(ctx, towerRange);
    this.drawImage(ctx, towerImg);
  }

  placeTower() {
    const pos = [this.cursorPos[0], this.cursorPos[1]];
    const options = { pos, game: this.game };
    const tower = new this.selectedTowerType(options);
    this.game.add(tower);
    this.addTowerEle(tower);
    this.cancelTower();
  }

  addTowerEle(tower) {
    const uiTowerRange = {};
    uiTowerRange.type = "circle";
    uiTowerRange.x = tower.pos[0];
    uiTowerRange.y = tower.pos[1];
    uiTowerRange.r = tower.range;
    uiTowerRange.f = "transparent";
    const uiTower = {};
    uiTower.type = "image";
    uiTower.tag = "button";
    uiTower.a = "showTowerOptions";
    uiTower.id = this.towerId;
    uiTower.image = tower.sprite;
    uiTower.x = tower.pos[0] - tower.sprite.width * 0.5 * tower.scale;
    uiTower.y = tower.pos[1] - tower.sprite.height * 0.5 * tower.scale;
    uiTower.dx = 0;
    uiTower.dy = 0;
    uiTower.s = tower.scale;
    uiTower.w = tower.sprite.width * tower.scale;
    uiTower.h = tower.sprite.height * tower.scale;
    uiTowerRange.innerObjs = { uiTower };
    UIElements[this.towerId] = uiTowerRange;
    this.towerId++;
  }

  showTowerOptions() {
    this.activeEle = UIElements[this.hoveredEle.id];
    this.activeEle.f = "rgb(0,0,0,0.75)";
  }
  
  hideTowerOptions() {
    this.activeEle.f = "transparent";
    this.activeEle = null;
  }

  isInBounds() {
    return this.cursorPos[0] >= 0 
    && this.cursorPos[0] <= 1500
    && this.cursorPos[1] >= 150
    && this.cursorPos[1] <= 1150
  }

  checkHover(ele) {
    return this.cursorPos[0] >= ele.x
      && this.cursorPos[0] <= ele.x + ele.w
      && this.cursorPos[1] >= ele.y
      && this.cursorPos[1] <= ele.y + ele.h;
  }

  sendWave() {
    this.game.sendWave();
  }

  youLose() {
    document.documentElement.removeEventListener("click", this.handleClick);
    document.documentElement.removeEventListener("mousemove", this.getCursorPosition);
    gameContainer.style.cursor = "default";
    retryButtonContainer.className = retryButtonContainer.className.replace("-hide", "-show");

    const loseMessage = {
      text: "You lose!",
      font: `100px ${gillSans}`,
      f: "black",
      x: 750,
      y: 600,
    }
    this.drawText(this.ctx, loseMessage);
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

  drawRect(ctx, ele) {
    if (ele.f) {
      ctx.fillStyle = ele.f;
      ctx.fillRect(ele.x, ele.y, ele.w, ele.h);
    } else {
      ctx.beginPath();
      ctx.lineWidth = ele.lw;
      ctx.strokeStyle = ele.s;
      ctx.rect(ele.x, ele.y, ele.w, ele.h);
      ctx.closePath();
      ctx.stroke();
    }
  }
  
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
      if (ele === this.hoveredEle) {
        ctx.fillStyle = hF;
      } else {
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
    if (typeof ele.text === "function") {
      ctx.fillText(ele.text(this.game), ele.x, ele.y)
    } else {
      ctx.fillText(ele.text, ele.x, ele.y)
    }
  }

  drawCircle(ctx, ele) {
    ctx.beginPath();
    ctx.arc(ele.x, ele.y, ele.r, 0, Math.PI * 2);
    if (ele.s) {
      ctx.strokeStyle = ele.s;
      ctx.lineWidth = ele.lw;
      ctx.stroke();
    }
    ctx.closePath();
    if (ele.f) {
      ctx.fillStyle = ele.f;
      ctx.fill();
    }
  }
}

module.exports = UI;