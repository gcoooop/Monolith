const NPC = require("./npc");

class Caveman extends NPC {
  constructor(options) {
    options.dimensions = [ Caveman.DIMENSION_X, Caveman.DIMENSION_Y ];
    options.speed = Caveman.SPEED;
    options.hitRadius = Caveman.HIT_RADIUS;
    options.health = Caveman.HEALTH;
    options.damage = Caveman.DAMAGE;
    options.flint = Caveman.FLINT;
    options.sprite = "caveman";
    super(options);
  }
}

Caveman.DIMENSION_X = 25;
Caveman.DIMENSION_Y = 25;
Caveman.SPEED = Math.sqrt(2);
Caveman.HIT_RADIUS = 10;
Caveman.HEALTH = 5;
Caveman.DAMAGE = 3;
Caveman.FLINT = 15;

module.exports = Caveman;