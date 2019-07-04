const TargetingQueue = require("./targeting_queue");

const earthTowerImg = document.getElementById("earth-tower");
const waterTowerImg = document.getElementById("water-tower");
const fireTowerImg = document.getElementById("fire-tower");

const AllTowerImgs = {
  earth: earthTowerImg,
  water: waterTowerImg,
  fire: fireTowerImg
};

class Tower {
  constructor(options) {
    this.pos = options.pos;
    this.range = options.range;
    this.damage = options.damage;
    this.reload = options.reload;
    this.sprite = AllTowerImgs[options.type];
    this.targets = new TargetingQueue();
  } 

  draw(ctx) {
    // ctx.drawImage(this.sprite, this.pos[0] - Tower.DIMENSION  * 0.5, this.pos[1] - Tower.DIMENSION  * 0.5);
  }

  calcTargets(npcs) {
    npcs.forEach(npc => {
      const inRange = this.inRange(npc);
      const targeted = this.targets.includes(npc);
      if (inRange && !targeted) {
        this.addTarget(npc);
      } else if (!inRange && targeted) {
        this.removeTarget(npc);
      }
    });
  }

  inRange(npc) {
    const dx = npc.pos[0] - this.pos[0];
    const dy = npc.pos[1] - this.pos[1];
    const d = Math.sqrt(dx**2 + dy**2);
    return d <= this.range;
  }

  addTarget(target) {
    this.targets.addTarget(target);
  }

  removeTarget(target) {
    this.targets.removeTarget(target);
  }
}

Tower.DIMENSION = 100;

module.exports = Tower;