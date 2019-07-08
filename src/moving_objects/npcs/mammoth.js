const NPC = require("./npc");

class Mammoth extends NPC {
  constructor(options) {
    options.speed = Mammoth.SPEED;
    options.hitRadius = Mammoth.HIT_RADIUS;
    options.health = Mammoth.HEALTH;
    options.damage = Mammoth.DAMAGE;
    options.flint = Mammoth.FLINT;
    options.scale = Mammoth.SCALE;
    options.sprite = "mammoth";
    super(options);
  }
}

Mammoth.SPEED = 0.8;
Mammoth.HIT_RADIUS = 50;
Mammoth.HEALTH = 15;
Mammoth.DAMAGE = 10;
Mammoth.FLINT = 30;
Mammoth.SCALE = 2;

module.exports = Mammoth;