class Tower {
  constructor(options) {
    this.pos = options.pos;
    this.range = options.range;
    this.damage = options.damage;
    this.reload = options.reload;
    this.sprite = document.getElementById(`tower-${options.type}`);
  }
}

module.exports = Tower;