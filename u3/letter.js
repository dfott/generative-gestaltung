class Letter {
  constructor(points) {
    this.connections = [];
    for (let i = 0; i < points.length; i += 2) {
      const pt1 = points[i];
      const pt2 = points[i + 1];
      if (pt1 && pt2) {
        this.connections.push(
          new Connection(createVector(pt1.x, pt1.y), createVector(pt2.x, pt2.y))
        );
      }
    }
    console.log(this.connections);
  }

  show() {
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
      c.show();
    });
  }
}

class Connection {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
  }

  show() {
    stroke(0, 255, 0);
    strokeWeight(3);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }
}
