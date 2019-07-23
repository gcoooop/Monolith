class Monolith {
  constructor() {
    this.pos = Monolith.POS;
    this.fullHealth = Monolith.HEALTH;
    this.health = Monolith.HEALTH;
  }

  draw(ctx) {
    const width = 50;
    const height = 100;
    const topLeftX = this.pos[0] - (0.5 * width);
    const topLeftY = this.pos[1] - (0.5 * height);

    ctx.fillStyle = "#201e23";
    ctx.fillRect(topLeftX, topLeftY, width, height);

    ctx.fillStyle = "#3f3f3f";
    ctx.fillRect(0, 1150, 1500, 50);

    ctx.beginPath();
    ctx.rect(5, 1150, 1490, 45);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 10;
    ctx.stroke();


    const x0Health = 10;
    const y = 1172;
    const x100Health = 1490;
    const xNHealth = (x100Health - x0Health) * (this.health / this.fullHealth) + x0Health;

    const healthPercentage = this.health / this.fullHealth * 100;
    let healthColor;
    switch (true) {
      case healthPercentage >= 80:
        healthColor = "#00FF00";
        break;
      case healthPercentage < 80 && healthPercentage >= 60:
        healthColor = "#96FF02";
        break;
      case healthPercentage < 60 && healthPercentage >= 40:
        healthColor = "#FFFF00";
        break;
      case healthPercentage < 40 && healthPercentage >= 20:
        healthColor = "#FF7F00";
        break;
      case healthPercentage < 20 && healthPercentage > 0:
        healthColor = "#FF0000";
        break;
      case healthPercentage < 0:
        healthColor = "transparent";
        break;
    }

    ctx.beginPath();
    ctx.moveTo(x0Health, y);
    ctx.lineTo(xNHealth, y);
    ctx.lineWidth = 31;
    ctx.strokeStyle = healthColor;
    ctx.stroke();
  }

  takeDamage(damage) {
    this.health -= damage;
  }
}

Monolith.POS = [1200, 365];
Monolith.HEALTH = 200;

module.exports = Monolith;