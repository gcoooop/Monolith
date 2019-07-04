class Queue {
  constructor() {
    this.queue = [];
  }

  enqueue(ele) {
    this.queue.push(ele);
    return ele;
  }

  dequeue() {
    return this.queue.shift();
  }

  length() {
    return this.queue.length;
  }
}

module.exports = Queue;