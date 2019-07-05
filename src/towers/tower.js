const TargetingQueue = require("./targeting_queue");
const Util = require("../util/util");

class Tower {
  constructor(options) {
    this.game = options.game;
    this.pos = options.pos;
    this.range = options.range;
    this.damage = options.damage;
    this.reload = options.reload;
    this.artillery = options.artillery;
    this.targets = new TargetingQueue();
    this.throttledFire = Util.throttle(this.fire.bind(this), this.reload);
  } 

  draw(ctx) {
    // do nothing!
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

  noTargets() {
    return this.targets.empty();
  }

  primaryTarget() {
    return this.targets.primaryTarget();
  }

  fire() {
    const target = this.primaryTarget();
    if (target) {
      const targetLocation = target.pos;
      const artillery = new this.artillery({ target, tower: this, game: this.game });
      this.game.add(artillery);
    }
  }
}

Tower.DIMENSION = 100;

module.exports = Tower;