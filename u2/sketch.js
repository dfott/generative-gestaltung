const scl = 10;
let rows, cols;
let zoff = 0;
const particles = [];
let flowfield;

const tree = [];
const leaves = [];
const len = 25;
let count = 0;

let forcefieldActive = false;
let sound;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  sound = loadSound("assets/wind.wav");

  // for (let i = 0; i < 400; i++) {
  //   particles.push(new Particle());
  // }
  // background("lightblue");

  const a = createVector(width / 2, height);
  const b = createVector(width / 2, height - len);
  const root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
  if (count < 7) {
    for (let i = tree.length - 1; i >= 0; i--) {
      const t = tree[i];
      if (!t.finished) {
        tree.push(t.branchA());
        tree.push(t.branchB());
      }
      t.finished = true;
    }
  }
  count++;
  if (count === 7) {
    for (let i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        const leaf = tree[i].end.copy();
        // leaves.push(leaf);
        leaves.push(new Particle(leaf.x, leaf.y));
      }
    }
  }
  if (count === 8) {
    sound.play();
    forcefieldActive = true;
    background("lightblue");
  }
}

function draw() {
  if (!forcefieldActive) {
    background("lightblue");
    noStroke();
    textSize(5);
    fill("darkblue");
    text("ENTERING AUTUMN IN", width / 4, height / 4);
    text(
      `${8 - count} ${8 - count > 1 ? "CLICKS" : "CLICK"}`,
      width / 2.5,
      height / 4 + 10
    );
  }
  tree.forEach((tree) => {
    tree.show();
  });
  leaves.forEach((leaf) => {
    // fill(255, 0, 100);
    // ellipse(leave.x, leave.y, 8, 8);
    leaf.show();
    if (forcefieldActive) {
      leaf.follow(zoff);
      leaf.update();
    }
  });
  // fill("black");
  // rect(5, 5, 20, 20);
  // fill("green");
  // textSize(10);
  // text(floor(frameRate()), 10, 20);)
  tree.forEach((tree) => {
    tree.show();
  });
  leaves.forEach((leaf) => {
    // fill(255, 0, 100);
    // ellipse(leave.x, leave.y, 8, 8);
    leaf.show();
    if (forcefieldActive) {
      leaf.follow(zoff);
      leaf.update();
    }
  });
  // fill("black");
  // rect(5, 5, 20, 20);
  // fill("green");
  // textSize(10);
  // text(floor(frameRate()), 10, 20);

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

  // particles.forEach((particle) => {
  //   // particle.follow(flowfield);
  //   particle.follow(zoff);
  //   particle.update();
  //   particle.show();
  // });
}
