const scl = 10;
let rows, cols;
let zoff = 0;
const particles = [];
let flowfield;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 400; i++) {
    particles.push(new Particle());
  }
  background("lightblue");
}

function draw() {
  fill("black");
  rect(5, 5, 20, 20);
  fill("green");
  textSize(10);
  text(floor(frameRate()), 10, 20);
  // let xoff = 0;
  // for (let x = 0; x < cols; x++) {
  //   let yoff = 0;
  //   for (let y = 0; y < rows; y++) {
  //     // const rand = map(noise(xoff, yoff), 0, 1, 0, 255);
  //     const angle = noise(xoff, yoff, zoff) * TWO_PI;
  //     const index = x + y * cols;

  //     stroke(0, 50);
  //     strokeWeight(1);
  //     const v = p5.Vector.fromAngle(angle);
  //     v.setMag(5);
  //     flowfield[index] = v;

  //     // push();
  //     // translate(x * scl, y * scl);
  //     // rotate(v.heading());
  //     // line(0, 0, scl, 0);
  //     // pop();

  //     // noFill();
  //     // strokeWeight(0.1);
  //     // rect(x * scl, y * scl, scl, scl);

  //     yoff += 0.2;
  //   }
  //   xoff += 0.2;
  // }
  zoff += 0.01;

  particles.forEach((particle) => {
    // particle.follow(flowfield);
    particle.follow(zoff);
    particle.update();
    particle.show();
  });
}
