class Letter {
  constructor(points, color) {
    this.connections = [];
    this.color = color;
    for (let i = 0; i < points.length; i += 2) {
      const pt1 = points[i];
      const pt2 = points[i + 1];
      if (pt1 && pt2) {
        this.connections.push(
          new Connection(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y))
          // new Vehicle(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y))
        );
      }
    }
  }

  fleeScreen(fleeScreen) {
    console.log("letter flee", fleeScreen);
    this.connections.forEach((c) => c.fleeScreen(fleeScreen));
  }

  isOffscreen() {
    return this.connections.every((c) => c.isOffscreen());
  }

  show(hide) {
    const mouse = createVector(mouseX, mouseY);
    const dist = this.connections.find((c) => {
      const d1 = p5.Vector.sub(mouse, c.begin);
      const d2 = p5.Vector.sub(mouse, c.end);
      if (d1.mag() < 20 || d2.mag() < 20) {
        return c;
      }
    });
    if (dist) {
      const lowerC = this.connections.filter((c) => {
        return c.begin.y < mouse.y && c.end.y < mouse.y;
      });
      const upperC = this.connections.filter((c) => {
        return c.begin.y > mouse.y && c.end.y > mouse.y;
      });
      lowerC.forEach((c) => {
        c.begin.sub(createVector(0, 1));
        c.end.sub(createVector(0, 1));
      });
      upperC.forEach((c) => {
        c.begin.add(createVector(0, 1));
        c.end.add(createVector(0, 1));
      });
    }

    this.connections.forEach((c) => {
      stroke(this.color);
      c.behaviors();
      c.update();
      if (!hide) {
        c.show();
      }
    });
  }
}

class Connection {
  constructor(begin, end) {
    // this.begin = new Vehicle(begin.x, begin.y);
    // this.end = new Vehicle(end.x, end.y);
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
    // stroke(0, 255, 0);
    strokeWeight(3);
    // point(this.vehicle.pos.x, this.vehicle.pos.y)
    // line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    const begin = p5.Vector.sub(this.vehicle.pos, this.dir);
    const end = p5.Vector.add(this.vehicle.pos, this.dir);
    line(begin.x, begin.y, end.x, end.y);
  }
}
