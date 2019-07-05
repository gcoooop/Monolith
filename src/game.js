const NPC = require("./moving_objects/npcs/npc");
const Tower = require("./towers/tower");
const Artillery = require("./moving_objects/artillery/artillery");
const Caveman = require("./moving_objects/npcs/caveman");
const Spider = require("./moving_objects/npcs/spider");
const Eagle = require("./moving_objects/npcs/eagle");
const Mammoth = require("./moving_objects/npcs/mammoth");

class Game {
  constructor() {
    this.towers = [];
    this.npcs = [];
    this.artillery = [];
    this.test();
  }

  test() {
    const sample = new Caveman({ path: 2 });
    // const sample = new Spider({ pos: [100, 100] });
    // const sample = new Eagle({ pos: [100, 100] });
    // const sample = new Mammoth({ pos: [100, 100] });
    this.add(sample);
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
    return [].concat(this.npcs, this.artillery, this.towers);
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

  checkCollisions() {
    
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

  step(dt) {
    this.moveObjects(dt);
    this.checkCollisions();
    this.runTargeting();
    this.launchArtillery();
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
}

module.exports = Game;