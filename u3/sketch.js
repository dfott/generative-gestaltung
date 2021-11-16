/*
  Quellen:

  - Konzept von arrive/flee zum Animieren von Wörtern
    Daniel Shiffman: Coding Challenge #59: Steering Behaviors
    Video auf YouTube: https://www.youtube.com/watch?v=4hA7G3gup-4
*/

let font;
let letters = [];

let currentWordIndex = 0;

let nullVector;

let fleeScreen = false;
let isFleeing = false;
let isArriving = false;

let xoff = 0;

function preload() {
  // Font von Google: https://fonts.google.com/specimen/Roboto+Mono
  font = loadFont("RobotoMono-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);

  textFont(font);
  textSize(192);

  nullVector = createVector(0, 0);
  letters = createLetters(words[currentWordIndex]);
}

function draw() {
  background(51);
  fleeLetters();
  letters.forEach((letter) => {
    letter.show(isArriving);
    letter.applyForce(createVector(map(noise(xoff), 0, 1, -0.3, 0.3), 0));
  });
  xoff += 0.01;
}

function mousePressed() {
  if (!isFleeing) {
    isFleeing = true;
    letters.forEach((l) => l.fleeScreen(true));
  }
}

/**
 * Generates points for every character in the given text and creates a Letter object using those points and a randomly generated color
 * @param {string} text - text to convert
 * @returns {[Letter]}
 */
function createLetters(text) {
  let widthOffset = 0;
  const r = random(256);
  const g = random(256);
  const b = random(256);
  return text.split("").map((c) => {
    const points = font.textToPoints(
      c,
      100 + widthOffset,
      height / 2 + 50,
      undefined,
      {
        sampleFactor: 0.32,
      }
    );
    widthOffset += 125;
    return new Letter(
      points,
      color(r + widthOffset / 20, g + widthOffset / 10, b + widthOffset / 50)
    );
  });
}

/**
 * Responsible for the process of changing the currently displayed word and making it move back to the center of the screen
 */
function fleeLetters() {
  // if the current word is 'fleeing' the screen
  if (!isArriving && isFleeing) {
    const isOffscreen = letters.every((l) => l.isOffscreen());
    if (isOffscreen) {
      if (currentWordIndex + 1 == words.length) {
        currentWordIndex = 0;
      } else {
        currentWordIndex++;
      }
      // create the new word, which will by default be centered. then start the fleeing process for the new letters
      letters = createLetters(words[currentWordIndex]);
      letters.forEach((l) => l.fleeScreen(true));
      isArriving = true;
    }
  } else if (isArriving && isFleeing) {
    // if the newly created word is now offscreen
    const isOffscreen = letters.every((l) => l.isOffscreen());
    if (isOffscreen) {
      isArriving = false;
      isFleeing = false;
      // set fleeScreen to false, so that the new letter vehicles 'arrive' back to the center
      letters.forEach((l) => l.fleeScreen(false));
    }
  }
}
