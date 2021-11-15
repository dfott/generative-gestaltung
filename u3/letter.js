class Letter {
  constructor(points, color) {
    this.connections = [];
    this.color = color;
    this.initConnections(points);
  }

  initConnections(points) {
    for (let i = 0; i < points.length; i += 2) {
      const pt1 = points[i];
      const pt2 = points[i + 1];
      if (pt1 && pt2) {
        this.connections.push(
          new Connection(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y))
        );
      }
    }
  }

  applyForce(f) {
    this.connections.forEach((c) => c.applyForce(f));
  }

  fleeScreen(fleeScreen) {
    this.connections.forEach((c) => c.fleeScreen(fleeScreen));
  }

  isOffscreen() {
    return this.connections.every((c) => c.isOffscreen());
  }

  show(hide) {
    this.connections.forEach((c) => {
      stroke(this.color);
      c.update();
      c.behaviors();
      if (!hide) {
        c.show();
      }
    });
  }
}

class Connection {
  constructor(begin, end) {
    this.begin = begin.copy();
    this.end = end.copy();

    const dVec = p5.Vector.sub(end, begin);
    this.dir = dVec.copy();
    this.dir.mult(0.5);
    dVec.mult(0.5);
    const center = p5.Vector.add(begin, dVec);
    this.vehicle = new Vehicle(center.x, center.y);
  }

  fleeScreen(fleeScreen) {
    this.vehicle.fleeScreen(fleeScreen);
  }

  applyForce(f) {
    this.vehicle.applyForce(f);
  }

  behaviors() {
    this.vehicle.behaviors();
  }

  isOffscreen() {
    return this.vehicle.isOffscreen();
  }

  update() {
    this.vehicle.update(this.begin, this.end);
  }

  show() {
    strokeWeight(3);
    const begin = p5.Vector.sub(this.vehicle.pos, this.dir);
    const end = p5.Vector.add(this.vehicle.pos, this.dir);
    line(begin.x, begin.y, end.x, end.y);
  }
}
