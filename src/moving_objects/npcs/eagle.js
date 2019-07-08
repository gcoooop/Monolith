const NPC = require("./npc");

class Eagle extends NPC {
  constructor(options) {
    options.speed = Eagle.SPEED;
    options.hitRadius = Eagle.HIT_RADIUS;
    options.health = Eagle.HEALTH;
    options.damage = Eagle.DAMAGE;
    options.flint = Eagle.FLINT;
    options.scale = Eagle.SCALE;
    options.sprite = "eagle";
    super(options);
  }
}

Eagle.SPEED = 2.5;
Eagle.HIT_RADIUS = 25;
Eagle.HEALTH = 4;
Eagle.DAMAGE = 10;
Eagle.FLINT = 10;
Eagle.SCALE = 2;

module.exports = Eagle;