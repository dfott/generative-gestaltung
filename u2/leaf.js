class Leaf {
  possibleColors = [
    color(236, 104, 22, 20),
    color(240, 131, 21, 20),
    color(255, 175, 75, 20),
  ];

  constructor(x, y) {
    this.pos = createVector(x, y);
    this.previousePos = this.pos.copy();
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 0.1;
    this.color = this.possibleColors[floor(random(3))];
    this.image = leafHeadImages[floor(random(leafHeadImages.length))];
  }

  updateColor() {
    this.color.levels = this.color.levels.map((level) => {
      if (level >= 45) {
        return level - 0.025;
      }
      return level;
    });
  }

  update() {
    this.previousePos = this.pos.copy();
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc.mult(0);
    this.updateColor();
    this.edges();
    if (this.maxSpeed < 5) {
      this.maxSpeed += 0.0075;
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    leafHeadCanvas.push();
    leafHeadCanvas.translate(this.pos.x, this.pos.y);
    leafHeadCanvas.rotate(p5.Vector.sub(this.pos, this.previousePos).heading());
    leafHeadCanvas.imageMode(CENTER);
    leafHeadCanvas.image(this.image, 0, 0, 7.5, 7.5);
    leafHeadCanvas.pop();

    leavesCanvas.stroke(this.color);
    leavesCanvas.strokeWeight(4);
    leavesCanvas.line(
      this.pos.x,
      this.pos.y,
      this.previousePos.x,
      this.previousePos.y
    );
  }

  follow(zoff) {
    const angle = noise(this.pos.x / 200, this.pos.y / 200, zoff) * TWO_PI * 4;
    const v = p5.Vector.fromAngle(angle);
    v.setMag(1);
    this.applyForce(v);
  }

  updatePrev() {
    this.previousePos = this.pos.copy();
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
