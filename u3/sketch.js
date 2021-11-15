let font;
let points;
let letters = [];

let currentWordIndex = 0;

let nullVector;

let fleeScreen = false;
let isFleeing = false;
let isArriving = false;

function preload() {
  font = loadFont("RobotoMono-Regular.ttf");
}

function mousePressed() {
  if (!isFleeing) {
    isFleeing = true;
    letters.forEach((l) => l.fleeScreen(true));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  textFont(font);
  textSize(192);

  nullVector = createVector(0, 0);

  letters = createLetters(words[currentWordIndex]);
}

function createLetters(text) {
  let count = 0;
  const r = random(256);
  const g = random(256);
  const b = random(256);
  return text.split("").map((c) => {
    points = font.textToPoints(c, 100 + count, height / 2 + 50, undefined, {
      sampleFactor: 0.32,
    });
    count += 125;
    return new Letter(
      points,
      color(r + count / 20, g + count / 10, b + count / 50)
    );
  });
}

function fleeLetters() {
  if (!isArriving && isFleeing) {
    const isOffscreen = letters.every((l) => l.isOffscreen());
    if (isOffscreen) {
      if (currentWordIndex + 1 == words.length) {
        currentWordIndex = 0;
      } else {
        currentWordIndex++;
      }
      letters = createLetters(words[currentWordIndex]);
      letters.forEach((l) => l.fleeScreen(true));
      isArriving = true;
    }
  } else if (isArriving && isFleeing) {
    const isOffscreen = letters.every((l) => l.isOffscreen());
    if (isOffscreen) {
      isArriving = false;
      isFleeing = false;
      letters.forEach((l) => l.fleeScreen(false));
    }
  }
}

let xoff = 0;

function draw() {
  background(51);
  fleeLetters();
  letters.forEach((letter) => {
    letter.show(isArriving);
    letter.applyForce(createVector(map(noise(xoff), 0, 1, -0.3, 0.3), 0));
  });
  xoff += 0.01;
}
