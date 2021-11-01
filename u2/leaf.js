/**
 * Base class used to display a Leaf and its tail.
 */
class Leaf {
  // possible colors, that the tail of a leaf can have. Will be chosen randomly
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
    // this image will be drawn to display the leaf head
    this.image = leafHeadImages[floor(random(leafHeadImages.length))];
  }

  /**
   * Reduces the rgb values for the current color by 0.025, if they are not below a certain threshold.
   */
  updateColor() {
    this.color.levels = this.color.levels.map((level) => {
      if (level >= 35) {
        return level - 0.03;
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
    if (this.maxSpeed < 8) {
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
    leafHeadCanvas.image(this.image, 0, 0, 35, 35);
    leafHeadCanvas.pop();

    leavesCanvas.stroke(this.color);
    leavesCanvas.strokeWeight(20);
    leavesCanvas.line(
      this.pos.x,
      this.pos.y,
      this.previousePos.x,
      this.previousePos.y
    );
  }

  /**
   * Simulate a forcefield by calculating a value using perlin noise. This will be used as a force to move the leaf
   * @param {number} zoff - the current z-offset
   */
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
