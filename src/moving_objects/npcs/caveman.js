const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.speed = Caveman.SPEED;
    options.hitRadius = Caveman.HIT_RADIUS;
    options.health = Caveman.HEALTH;
    options.damage = Caveman.DAMAGE;
    options.flint = Caveman.FLINT;
    options.scale = Caveman.SCALE;
    options.sprite = "caveman";
    super(options);
  }
}

Caveman.SPEED = 1.25;
Caveman.HIT_RADIUS = 25;
Caveman.HEALTH = 5;
Caveman.DAMAGE = 5;
Caveman.FLINT = 15;
Caveman.SCALE = 1.5;

module.exports = Caveman;