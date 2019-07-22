const TargetingQueue = require("./targeting_queue");
const Util = require("../util/util");

class Tower {
  constructor(options) {
    this.game = options.game;
    this.sprite = options.sprite;
    this.scale = Tower.SCALE;
    this.pos = options.pos;
    this.range = options.range;
    this.damage = options.damage;
    this.reload = options.reload;
    this.flint = options.flint;
    this.artillery = options.artillery;
    this.targets = new TargetingQueue();
    this.throttledFire = Util.throttle(this.fire.bind(this), this.reload);
  } 

  draw(ctx) {
    const x = this.pos[0];
    const y = this.pos[1];
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.sprite, - this.sprite.width * 0.5, - this.sprite.height * 0.5 );
    ctx.restore();
  }

  allTargets() {
    return this.targets.allTargets();
  }

  calcTargets(npcs) {
    npcs.forEach(npc => {
      const inRange = this.inRange(npc);
      const inQueue = this.targets.includes(npc);
      if (inRange && !inQueue) {
        this.addTarget(npc);
      } else if (!inRange && inQueue) {
        this.removeTarget(npc);
      }
    });

    this.targets.targets.forEach(target => {
      const inGame = npcs.includes(target);
      if (!inGame) this.removeTarget(target);
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
      const artillery = new this.artillery({ target, tower: this, game: this.game });
      this.game.add(artillery);
    }
  }

  strikeReport() {
    // do nothing
  }
}

Tower.SCALE = 0.75;

module.exports = Tower;