const Queue = require("../util/queue");

class Path {
  constructor(number) {
    this.points = new Queue();
    this[`path${number}`]();
    this.generateEnpoint();
  }

  enqueue(point) {
    return this.points.enqueue(point);
  }

  dequeue() {
    return this.points.dequeue();
  }

  pointCount() {
    return this.points.length();
  }

  finalPos() {
    return this.points.atIndex(this.points.length - 1);
  }

  path1() {
    // randomly determine which coordinate of the staring position is negative
    // this is necessary because the path starts in a corner
    if (Math.random() < 0.5) {
      this.enqueue( [ -50, this.generateInteger(215) ] );
    } else {
      this.enqueue( [ this.generateInteger(90), 100 ] );
    }
    this.enqueue( [ this.generateInteger(190, 180), this.generateInteger(250, 200) ] );
    this.enqueue( [ 675, 290 ] );
    this.enqueue( [ 1090, 370 ] );
  }
  
  path2() {
    this.enqueue( [ -50, this.generateInteger(1065, 950) ] );
    this.enqueue( [ this.generateInteger(290, 260), this.generateInteger(850, 825) ] );
    this.enqueue( [ 750, 390 ] );
    this.enqueue( [ 1090, 370 ] );
  }
  
  path3() {
    this.enqueue( [ this.generateInteger(590, 490), 1200 ] );
    this.enqueue( [ 750, 775 ] );
    this.enqueue( [ 820, 610 ] );
    this.enqueue( [ 900, 550 ] );
    this.enqueue( [ 930, 400 ] );
    this.enqueue( [ 1090, 370 ] );
  }
  
  path4() {
    this.enqueue( [ this.generateInteger(1315, 1250), 1200 ] );
    this.enqueue( [ 1030, 805 ] );
    this.enqueue( [ 900, 550 ] );
    this.enqueue( [ 930, 400 ] );
    this.enqueue( [ 1090, 370 ] );
  }

  generateEnpoint() {
    const endpointNumber = this.generateInteger(4);

    let endpoint;
    switch (endpointNumber) {
      case 0:
        endpoint = [ [1160, this.generateInteger(415, 315)] ];
        break;
      case 1:
        endpoint = [ [1155, 285], [1265, 285], [1240, this.generateInteger(415, 315)] ];
        break;
      case 2:
        endpoint = [ [1155, 285], [this.generateInteger(1225, 1175), 300] ];
        break;
      case 3:
        endpoint = [ [1155, 455], [1255, 455], [1240, this.generateInteger(415, 315)] ];
        break;
      case 4:
        endpoint = [ [1155, 455], [this.generateInteger(1225, 1175), 400] ];
        break;
    }
    endpoint.forEach(ep => this.enqueue(ep));
  }

  generateInteger(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

module.exports = Path;