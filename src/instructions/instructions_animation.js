const instructionsEle = document.getElementById("instructions-window");
const htpButton = document.getElementById("htp-button");

class HowToPlayAnimation {
  constructor(canvasEl, ctx) {
    this.canvasEl = canvasEl;
    this.ctx = ctx;
    this.page = 0;
    
    this.startHTP = this.startHTP.bind(this);
    htpButton.addEventListener("click", this.startHTP);
  }

  startHTP() {
    htpButton.removeEventListener("click", this.startHTP);
    this.page++;
    if (this.page <= 2) {
      setTimeout(this.startHTP, 2000);
    } else {
      htpButton.addEventListener("click", this.startHTP);
    }
  }

  draw() {
    switch (this.page) {
      case 0:
        break;
      case 1:
        this.monolithIntro();
        break;
      case 2:
        this.objectiveIntro();
        break;
      default: 
        this.page = 0;
        break;
    }
  }

  monolithIntro() {
    this.ctx.font = "64px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("This is the monolith.", 750, 500);
    this.pulsingArrow(1100, 215, 0);
  }

  objectiveIntro() {
    this.ctx.font = "64px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("It is your job is to protect it!", 750, 500);
  }

  pulsingArrow(x = 0, y = 0, theta = 0) {
    this.ctx.save();

    this.ctx.translate(x, y);
    this.ctx.rotate(theta);

    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "black";
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, -10);
    this.ctx.lineTo(100, -10);
    this.ctx.lineTo(100, -30);
    this.ctx.lineTo(150, 0);
    this.ctx.lineTo(100, 30);
    this.ctx.lineTo(100, 10);
    this.ctx.lineTo(0, 10);
    this.ctx.lineTo(0, 0);
    this.ctx.stroke();

    this.ctx.restore();
  };
}

module.exports = HowToPlayAnimation;