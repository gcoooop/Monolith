const NPC = require("./npc");
const Caveman = require("./caveman");

class Game {
  constructor() {
    this.towers = [];
    this.npcs = [];
    this.projectiles = [];
    this.test();
  }

  test() {
    const caveman = new Caveman({ pos: [100, 100] });
    this.add(caveman);
  }

  add(object) {
    if (object instanceof NPC) {
      this.npcs.push(object);
    } else {
      throw new Error("unknown object!!!")
    }
  }

  allObjects() {
    return [].concat(this.npcs, this.projectiles, this.towers);
  }

  draw(ctx) {
    // clears the canvas area
    ctx.clearRect(0, 0, 1500, 1000);

    this.allObjects().forEach(object => {
      object.draw(ctx);
    });
  }

  moveObjects(dt) {
    this.allObjects().forEach(object => {
      object.move(dt);
    });
  }

  step(dt) {
    this.moveObjects(dt);
  }
}

module.exports = Game;