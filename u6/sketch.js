let flock;

let widthRes;
let heightRes;
const gridSize = 15;
let rows;
let cols;

let fishImg;
let piranhaImg;
let piranhaActiveImg;
let sharkImg;

function setup() {
  widthRes = windowWidth / gridSize;
  heightRes = windowHeight / gridSize;

  fishImg = loadImage("./assets/fish2.svg");
  piranhaImg = loadImage("./assets/piranha.svg");
  piranhaActiveImg = loadImage("./assets/piranha2.svg");
  sharkImg = loadImage("./assets/shark.svg");

  createCanvas(windowWidth, windowHeight);
  flock = new Flock();
  // Add an initial set of boids into the system
  generateFish();
  generatePiranhas();
  generateSharks();
  setInterval(() => {
    generateFish();
  }, 10000);
}

function draw() {
  background(51);
  flock.updateGrid();
  flock.run();
}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Shark(mouseX, mouseY));
}

function generateFish() {
  let x = random(width);
  let y = random(height);
  for (let i = 0; i < 100; i++) {
    let b = new Fish(x, y);
    flock.addBoid(b);
  }
}

function generateSharks() {
  flock.addBoid(new Shark(random(width), random(height)));
  flock.addBoid(new Shark(random(width), random(height)));
  flock.addBoid(new Shark(random(width), random(height)));
}

function generatePiranhas() {
  let x = random(width);
  let y = random(height);
  for (let i = 0; i < 20; i++) {
    flock.addBoid(new Piranha(x, y));
  }
  x = random(width);
  y = random(height);
  for (let i = 0; i < 20; i++) {
    flock.addBoid(new Piranha(x, y));
  }
}
