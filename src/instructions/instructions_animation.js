class HowToPlayAnimation {
  constructor() {
    this.page = 0;
    this.nextPage = this.nextPage.bind(this);
  }

  nextPage(origin) {
    if (this.page === 0 && origin === "click") {
      this.page++;
      setTimeout(() => this.nextPage("timeout"), 4000);
    } else if (this.page > 0 && origin === "timeout") {
      this.page++;
      setTimeout(() => this.nextPage("timeout"), 4000);
    }
  }

  draw(ctx) {
    ctx.translate(0, 150);
    switch (this.page) {
      case 0:
        break;
      case 1:
        this.monolithIntro(ctx);
        break;
      case 2:
        this.objectiveIntro(ctx);
        break;
      case 3:
        this.healthBarIntro(ctx);
        break;
      case 4:
        this.healthBarJoke(ctx);
        break;
      case 5:
        this.enemiesIntro(ctx);
        break;
      case 6:
        this.towersIntro(ctx);
        break;
      case 7:
        this.towersUtility(ctx);
        break;
      case 8:
        this.towersHint(ctx);
        break;
      case 9:
        this.experimentHint(ctx);
        break;
      case 10:
        this.towerSelection(ctx);
        break;
      case 11:
        this.towerPlacement(ctx);
        break;
      case 12:
        this.towerCancel(ctx);
        break;
      case 13:
        this.towerPurchasing(ctx);
        break;
      case 14:
        this.earningFlint(ctx);
        break;
      case 15:
        this.purchaseMechanics1(ctx);
        break;
      case 16:
        this.purchaseMechanics2(ctx);
        break;
      case 17:
        this.purchaseHint(ctx);
        break;
      case 18:
        this.conclusion1(ctx);
        break;
      case 19:
        this.conclusion2(ctx);
        break;
      case 20:
        this.goodLuck(ctx);
        break;
      default: 
        this.page = 0;
        break;
    }
    ctx.translate(0, -150);
  }

  monolithIntro(ctx) {
    ctx.font = "64px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("This is the monolith", 750, 500);
    this.arrow(ctx, 1150, 215, 0);
  }

  objectiveIntro(ctx) {
    this.monolithIntro(ctx);
    ctx.fillText("It is up to you to protect it!", 750, 600);
  }

  healthBarIntro(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("This is the monolith's health bar", 750, 500);
    this.arrow(ctx, 250, 950, Math.PI * 0.5);
    this.arrow(ctx, 1250, 950, Math.PI * 0.5);
    this.arrow(ctx, 750, 950, Math.PI * 0.5);
  }

  healthBarJoke(ctx) {
    this.healthBarIntro(ctx);
    ctx.fillText("Don't let it deplete!", 750, 600);
  }

  enemiesIntro(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Enemies will attack from these four paths", 750, 500);
    this.arrow(ctx, 250, 100, Math.PI * 0.1);
    this.arrow(ctx, 175, 750, -Math.PI * 0.15);
    this.arrow(ctx, 650, 825, -Math.PI * 0.35);
    this.arrow(ctx, 1150, 825, -Math.PI * 0.65);
  }

  towersIntro(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("These are your towers!", 750, 500);
    this.arrow(ctx, 1475, 185, 0);
    this.arrow(ctx, 1475, 410, 0);
    this.arrow(ctx, 1475, 635, 0);
  }

  towersUtility(ctx) {
    this.towersIntro(ctx);
    ctx.fillText("Towers will target and damage enemies in range", 750, 600);
  }
  
  towersHint(ctx) { 
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Each tower has its own srengths and weaknesses", 750, 500);
  }

  experimentHint(ctx) { 
    this.towersHint(ctx);
    ctx.fillText("Experiment!", 750, 600);
  }

  towerSelection(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Click to select a tower", 750, 400);
  }

  towerPlacement(ctx) {
    this.towerSelection(ctx);
    ctx.fillText("Then, click on the map to place the tower", 750, 500);
  }

  towerCancel(ctx) {
    this.towerPlacement(ctx);
    ctx.fillText("Or, click outside the map to cancel", 750, 600);
  }

  towerPurchasing(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Towers are not free! You must have enough flint", 750, 500);
  }

  earningFlint(ctx) {
    this.towerPurchasing(ctx);
    ctx.fillText("Stopping enemies rewards you with more flint", 750, 600);
  }

  purchaseMechanics1(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("The more towers you buy,", 750, 400);
  }

  purchaseMechanics2(ctx) {
    this.purchaseMechanics1(ctx)
    ctx.fillText("the more expensive they get", 750, 500);
  }

  purchaseHint(ctx) {
    this.purchaseMechanics2(ctx);
    ctx.fillText("Spend wisely and diversify your arsenal!", 750, 600);
  }

  conclusion1(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Place towers strategically around the map!", 750, 500);
  }

  conclusion2(ctx) {
    this.conclusion1(ctx);
    ctx.fillText("If the monolith runs out of health, you lose!", 750, 600);
  }

  goodLuck(ctx) {
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GOOD LUCK!", 750, 500);
  }

  arrow(ctx, x = 0, y = 0, theta = 0) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(theta);

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 0);
    ctx.lineTo(-50, 30);
    ctx.lineTo(-50, 10);
    ctx.lineTo(-150, 10);
    ctx.lineTo(-150, -10);
    ctx.lineTo(-50, -10);
    ctx.lineTo(-50, -30);
    ctx.closePath();
    ctx.stroke();
    ctx.fillStyle = "yellow";
    ctx.fill();

    ctx.restore();
  };
}

module.exports = HowToPlayAnimation;