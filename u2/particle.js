class Particle {
  possibleColors = [
    color(236, 104, 22, 4),
    color(240, 131, 21, 4),
    color(255, 175, 75, 4),
  ];

  constructor() {
    this.pos = createVector(random(width), random(height));
    this.previousePos = this.pos.copy();
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 6;
    this.color = this.possibleColors[floor(random(3))];
  }

  updateColor() {
    if (this.color.levels[0] >= 20) {
      this.color.levels[0] = this.color.levels[0] - 0.1;
    }
    if (this.color.levels[1] >= 20) {
      this.color.levels[1] = this.color.levels[1] - 0.1;
    }
    if (this.color.levels[2] >= 20) {
      this.color.levels[2] = this.color.levels[2] - 0.1;
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
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    // stroke(0, 5);
    stroke(this.color);
    strokeWeight(1);
    // point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.previousePos.x, this.previousePos.y);
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
