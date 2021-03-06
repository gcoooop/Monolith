const NPC = require("./moving_objects/npcs/npc");
const Tower = require("./towers/tower");
const Artillery = require("./moving_objects/artillery/artillery");
const Monolith = require("./monolith/monolith");

const Waves = require("./waves/waves");

class Game {
  constructor() {
    this.running = true;
    this.towers = [];
    this.npcs = [];
    this.artillery = [];
    this.flint = 200;
    this.monolith = new Monolith();
    this.wave = 1;
    this.waveProgress = "complete";
  }

  sendWave() {
    if (this.waveProgress === "complete") {
      Waves[this.wave](this);
      this.waveProgress = "incomplete";
    }
  }

  add(object) {
    if (object instanceof NPC) {
      this.npcs.push(object); 
    } else if (object instanceof Tower)  {    
      this.spendFlint(object.flint);
      this.towers.push(object);
    } else if (object instanceof Artillery) {
      this.artillery.push(object);
    } else {
      throw new Error("unknown object!!!")
    }
  }

  allObjects() {
    return [].concat(this.npcs, this.artillery, this.towers, this.monolith);
  }

  allMoveableObjects() {
    return [].concat(this.npcs, this.artillery);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 1850, 1200);
    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  moveObjects(dt) {
    this.allMoveableObjects().forEach(object => {
      object.move(dt);
    });
  }

  runTargeting() {
    this.towers.forEach(tower => {
      tower.calcTargets(this.npcs);
    });
  }

  launchArtillery() {
    this.towers.forEach(tower => {
      if (!tower.noTargets()) tower.throttledFire();
    });
  }

  damageMonolith(damage) {
    this.monolith.takeDamage(damage);
  }

  earnFlint(amount) {
    this.flint += amount;
    this.ui.draw()
  }
  
  spendFlint(amount) {
    this.flint -= amount;
  }

  step(dt) {
    this.moveObjects(dt);
    this.runTargeting();
    this.launchArtillery();
    this.checkForLost();
  }

  remove(object) {
    if (object instanceof NPC) {
      this.earnFlint(object.flint);
      this.npcs.splice(this.npcs.indexOf(object), 1);
      if (this.waveComplete()) {
        this.wave++;
        this.waveProgress = "complete";
      }
    } else if (object instanceof Tower) {
      this.towers.splice(this.towers.indexOf(object), 1);
    } else if (object instanceof Artillery) {
      this.artillery.splice(this.artillery.indexOf(object), 1);
    } else {
      throw new Error("unknown object!!!")
    }
  }

  checkForLost() {
    if (this.monolith.health <= 0) {
      this.running = false;
      this.ui.youLose();
    }
  }

  waveComplete() {
    return !this.npcs.length;
  }
}

module.exports = Game;