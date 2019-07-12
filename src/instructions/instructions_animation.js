const htpButton = document.getElementById("htp-button");

class HowToPlayAnimation {
  constructor(canvasEl, ctx) {
    this.canvasEl = canvasEl;
    this.ctx = ctx;
    this.page = 6;

    this.startHTP = this.startHTP.bind(this);
    htpButton.addEventListener("click", this.startHTP);
  }

  startHTP() {
    htpButton.removeEventListener("click", this.startHTP);
    this.page++;
    if (this.page <= 20) {
      setTimeout(this.startHTP, 4000);
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
      case 3:
        this.healthBarIntro();
        break;
      case 4:
        this.healthBarJoke();
        break;
      case 5:
        this.enemiesIntro();
        break;
      case 6:
        this.towersIntro();
        break;
      case 7:
        this.towersUtility();
        break;
      case 8:
        this.towersHint();
        break;
      case 9:
        this.experimentHint();
        break;
      case 10:
        this.towerSelection();
        break;
      case 11:
        this.towerPlacement();
        break;
      case 12:
        this.towerCancel();
        break;
      case 13:
        this.towerPurchasing();
        break;
      case 14:
        this.earningFlint();
        break;
      case 15:
        this.purchaseMechanics1();
        break;
      case 16:
        this.purchaseMechanics2();
        break;
      case 17:
        this.purchaseHint();
        break;
      case 18:
        this.conclusion1();
        break;
      case 19:
        this.conclusion2();
        break;
      case 20:
        this.goodLuck();
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
    this.ctx.fillText("This is the monolith", 750, 500);
    this.arrow(1150, 215, 0);
  }

  objectiveIntro() {
    this.monolithIntro();
    this.ctx.fillText("It is up to you to protect it!", 750, 600);
  }

  healthBarIntro() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("This is the monolith's health bar", 750, 500);
    this.arrow(250, 950, Math.PI * 0.5);
    this.arrow(1250, 950, Math.PI * 0.5);
    this.arrow(750, 950, Math.PI * 0.5);
  }

  healthBarJoke() {
    this.healthBarIntro();
    this.ctx.fillText("Don't let it deplete!", 750, 600);
  }

  enemiesIntro() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Enemies will attack from these four paths", 750, 500);
    this.arrow(250, 100, Math.PI * 0.1);
    this.arrow(175, 750, -Math.PI * 0.15);
    this.arrow(650, 825, -Math.PI * 0.35);
    this.arrow(1150, 825, -Math.PI * 0.65);
  }

  towersIntro() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("These are your towers!", 750, 500);
    this.arrow(1475, 185, 0);
    this.arrow(1475, 410, 0);
    this.arrow(1475, 635, 0);
  }

  towersUtility() {
    this.towersIntro();
    this.ctx.fillText("Towers will target and damage enemies in range", 750, 600);
  }
  
  towersHint() { 
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Each tower has its own srengths and weaknesses", 750, 500);
  }

  experimentHint() { 
    this.towersHint();
    this.ctx.fillText("Experiment!", 750, 600);
  }

  towerSelection() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Click to select a tower", 750, 400);
  }

  towerPlacement() {
    this.towerSelection();
    this.ctx.fillText("Then, click on the map to place the tower", 750, 500);
  }

  towerCancel() {
    this.towerPlacement();
    this.ctx.fillText("Or, click outside the map to cancel", 750, 600);
  }

  towerPurchasing() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Towers are not free! You must have enough flint", 750, 500);
  }

  earningFlint() {
    this.towerPurchasing();
    this.ctx.fillText("Stopping enemies rewards you with more flint", 750, 600);
  }

  purchaseMechanics1() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("The more towers you buy,", 750, 400);
  }

  purchaseMechanics2() {
    this.purchaseMechanics1()
    this.ctx.fillText("the more expensive they get", 750, 500);
  }

  purchaseHint() {
    this.purchaseMechanics2();
    this.ctx.fillText("Spend wisely and diversify your arsenal!", 750, 600);
  }

  conclusion1() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Place towers strategically around the map!", 750, 500);
  }

  conclusion2() {
    this.conclusion1();
    this.ctx.fillText("If the monolith runs out of health, you lose!", 750, 600);
  }

  goodLuck() {
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText("GOOD LUCK!", 750, 500);
  }

  arrow(x = 0, y = 0, theta = 0) {
    this.ctx.save();

    this.ctx.translate(x, y);
    this.ctx.rotate(theta);

    this.ctx.beginPath();
    this.ctx.lineWidth = 10;
    this.ctx.strokeStyle = "black";
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(-50, 30);
    this.ctx.lineTo(-50, 10);
    this.ctx.lineTo(-150, 10);
    this.ctx.lineTo(-150, -10);
    this.ctx.lineTo(-50, -10);
    this.ctx.lineTo(-50, -30);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = "yellow";
    this.ctx.fill();

    this.ctx.restore();
  };
}

module.exports = HowToPlayAnimation;