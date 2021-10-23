class Particle {
  possibleColors = [
    color(236, 104, 22, 20),
    color(240, 131, 21, 20),
    color(255, 175, 75, 20),
  ];

  constructor(x, y) {
    // this.pos = createVector(random(width), random(height));
    this.pos = createVector(x, y);
    this.previousePos = this.pos.copy();
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 0.1;
    this.color = this.possibleColors[floor(random(3))];
  }

  updateColor() {
    if (this.color.levels[0] >= 45) {
      this.color.levels[0] = this.color.levels[0] - 0.025;
    }
    if (this.color.levels[1] >= 45) {
      this.color.levels[1] = this.color.levels[1] - 0.025;
    }
    if (this.color.levels[2] >= 45) {
      this.color.levels[2] = this.color.levels[2] - 0.025;
    }
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
    // stroke(0, 5);
    leavesCanvas.stroke(this.color);
    leavesCanvas.strokeWeight(4);
    // point(this.pos.x, this.pos.y);
    leavesCanvas.line(this.pos.x, this.pos.y, this.previousePos.x, this.previousePos.y);
  }

  follow(zoff) {
    const angle = noise(this.pos.x / 200, this.pos.y / 200, zoff) * TWO_PI * 4;
    const v = p5.Vector.fromAngle(angle);
    v.setMag(1);
    this.applyForce(v);
    // const x = floor(this.pos.x / scl);
    // const y = floor(this.pos.y / scl);
    // const index = x + y * cols;
    // const force = vectors[index];
    // this.applyForce(force);
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
