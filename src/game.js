const NPC = require("./moving_objects/npcs/npc");
const Tower = require("./towers/tower");
const Artillery = require("./moving_objects/artillery/artillery");
const Monolith = require("./monolith/monolith");

const Wave1 = require("./waves/wave1");

class Game {
  constructor() {
    this.running = true;
    this.towers = [];
    this.npcs = [];
    this.artillery = [];
    this.flint = 200;
    this.monolith = new Monolith();
    this.test()
  }

  test() {
    Wave1(this);
  }

  add(object) {
    if (object instanceof NPC) {
      this.npcs.push(object); 
    } else if (object instanceof Tower)  {    
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
    // clears the canvas area
    ctx.clearRect(0, 0, 1500, 1000);

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

  payFlint(amount) {
    this.flint += amount;
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
      this.npcs.splice(this.npcs.indexOf(object), 1);
    } else if (object instanceof Tower) {
      this.towers.splice(this.towers.indexOf(object), 1);
    } else if (object instanceof Artillery) {
      this.artillery.splice(this.artillery.indexOf(object), 1);
    } else {
      throw new Error("unknown object!!!")
    }
  }

  checkForLost() {
    if (this.monolith.health <= 0) this.running = false;
  }
}

module.exports = Game;