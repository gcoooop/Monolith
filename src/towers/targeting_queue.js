class TargetingQueue {
  constructor() {
    this.targets = [];
    this.order = "first";
  }

  empty() {
    return !this.targets.length;
  }

  includes(target) {
    return this.targets.includes(target);
  }

  addTarget(target) {
    this.targets.push(target);
    return target
  }

  removeTarget(target) {
    this.targets = this.targets.filter(ele => ele != target);
    return target;
  }

  primaryTarget() {
    return this.targets[0] || null;
  }

  reorder(order) {

  }
}

module.exports = TargetingQueue;