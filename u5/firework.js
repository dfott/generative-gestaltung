class Firework {
  constructor(particleGenerator) {
    this.color = color(random(255), random(255), random(255));
    this.rocket = new RocketParticle(random(width), height, this.color);
    this.particles = [];
    this.particleGenerator = particleGenerator;
    this.exploded = false;
  }

  isDone() {
    return this.exploded && this.particles.length === 0;
  }

  update() {
    if (!this.exploded) {
      this.rocket.applyForce(gravityForce);
      this.rocket.update();
      if (this.rocket.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }
    this.particles.forEach((p) => {
      p.applyForce(gravityForce);
      p.update();
    });
    this.particles = this.particles.filter((p) => !p.isDone());
  }

  explode() {
    this.particles = this.particleGenerator(
      this.rocket.pos.x,
      this.rocket.pos.y,
      this.color
    );
  }

  show() {
    if (!this.exploded) {
      this.rocket.show();
    }
    this.particles.forEach((p) => {
      p.show();
    });
  }
}

class LetterFirework extends Firework {
  constructor(particleGenerator, letter, startX, startY) {
    super(particleGenerator);
    if (startX && startY) {
      this.rocket = new RocketParticle(startX, startY, this.color);
      this.rocket.vel.x = 0;
    }
    this.letter = letter;
  }

  explode() {
    const points = robotoFont.textToPoints(
      this.letter,
      this.rocket.pos.x,
      this.rocket.pos.y
    );

    this.particles = points
      .map((point) => {
        return new LetterParticle(
          this.rocket.pos.copy(),
          createVector(point.x, point.y),
          this.color
        );
      })
      .concat(
        ...this.particleGenerator(
          this.rocket.pos.x,
          this.rocket.pos.y,
          this.color
        )
      );
  }
}
