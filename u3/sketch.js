let font;
let points;
let vehicles = [];
let letters = [];

const words = [
  "click",
  "perlin",
  "Lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "Suspendisse",
  "porta",
  "nec",
  "lacus",
  "a",
  "laoreet",
  "Quisque",
  "ac",
  "malesuada",
  "tellus",
  "Etiam",
  "iaculis",
  "sagittis",
  "ante",
  "non",
  "placerat",
  "felis",
  "gravida",
  "eu",
];
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

let conns = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  textFont(font);
  textSize(192);
  fill(255);
  noStroke();

  nullVector = createVector(0, 0);

  letters = createLetters(words[currentWordIndex]);
  conns.push(new Connection(createVector(200, 200), createVector(200, 230)));
  conns.push(new Connection(createVector(200, 250), createVector(200, 280)));
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

function draw() {
  background(51);
  fleeLetters();
  letters.forEach((letter) => {
    letter.show(isArriving);
  });
}
