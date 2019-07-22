const UIElements = require("./ui_elements");
const gameContainer = document.getElementById("monolith-game");

class UI {
  constructor(ctx, game) {
    this.ctx = ctx;
    this.game = game;
    this.scale = 1;
    this.selectedTowerType = null;
    this.message = "";
    this.cursorPos = [0, 0];
    this.hoveredEle = null;

    this.setScale = this.setScale.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getCursorPosition = this.getCursorPosition.bind(this);
    this.checkHover = this.checkHover.bind(this);
    this.placeTower = this.placeTower.bind(this);
    gameContainer.addEventListener("click", this.handleClick);
    gameContainer.addEventListener("mousemove", this.getCursorPosition);
    this.draw()
  }

  draw(ctx = this.ctx) {
    ctx.clearRect(0, 0, 1850, 1200);
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

    if (this.selectedTowerType) {
      this.followCursor(ctx);
    }
  }

  setScale(scale) {
    this.scale = scale;
  }

  handleClick(event) {
    if (this.hoveredEle) {
      switch (this.hoveredEle.a) {
        case "placeTower":
          this.selectTower();
          break;
        default:
          break;
      }
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
        this.hoveredEle = ele;
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
    if (typeof ele.text === "function") {
      ctx.fillText(ele.text(), ele.x, ele.y)
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

  checkHover(ele) {
    return this.cursorPos[0] >= ele.x 
    && this.cursorPos[0] <= ele.x + ele.w 
    && this.cursorPos[1] >= ele.y 
    && this.cursorPos[1] <= ele.y + ele.h;
  }

  selectTower() {
    this.selectedTowerType = this.hoveredEle.tower;
  }

  followCursor(ctx) {
    const towerRange = {
      x: this.cursorPos[0],
      y: this.cursorPos[1],
      r: this.selectedTowerType.RANGE,
      f: "rgba(0,0,0,0.2)"
    };
    const towerImg = {
      image: this.selectedTowerType.SPRITE,
      x: this.cursorPos[0],
      y: this.cursorPos[1],
      dx: -this.selectedTowerType.SPRITE.width * 0.5,
      dy: -this.selectedTowerType.SPRITE.height * 0.5,
    }
    this.drawCircle(ctx, towerRange);
    this.drawImage(ctx, towerImg);
  }

  placeTower() {
    const options = { pos: this.cursorPos, game: this.game };
    if (this.game.flint >= this.hoveredEle.FLINT) {
      this.game.add(new this.hoveredEle.tower(options))
    } else {
      this.message = "You do not have enough flint!";
      setTimeout(() => {
        this.message = "";
      }, 4000);
    }
  }

  attackButton(ctx) {
    this.fillStyle = "red";
    this.roundRect(ctx, x, y, 135, 50, {tlr: 15}, true);
  }
}

module.exports = UI;