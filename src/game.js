const NPC = require("./moving_objects/npcs/npc");
const Tower = require("./towers/tower");
const Caveman = require("./moving_objects/npcs/caveman");
const Spider = require("./moving_objects/npcs/spider");
const Eagle = require("./moving_objects/npcs/eagle");
const Mammoth = require("./moving_objects/npcs/mammoth");

class Game {
  constructor() {
    this.towers = [];
    this.npcs = [];
    this.projectiles = [];
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
    } else {
      throw new Error("unknown object!!!")
    }
  }

  allObjects() {
    return [].concat(this.npcs, this.projectiles, this.towers);
  }

  allMoveableObjects() {
    return [].concat(this.npcs, this.projectiles);
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

  step(dt) {
    this.moveObjects(dt);
    this.runTargeting();
  }
}

module.exports = Game;