class TargetingQueue {
  constructor() {
    this.targets = [];
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

  allTargets() {
    return this.targets;
  }

  reorder(order) {
    // NPCs have a distToFinalPos function that should be called to reorder the queue
  }
}

module.exports = TargetingQueue;