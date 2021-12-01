/**
 * Quellen:
 * - Grundlagenwissen für die Entwicklung des Tachos
 *   Daniel Shiffman: Nature of Code Chapter 3. Oscillation
 *   Buch aus https://natureofcode.com/book/chapter-3-oscillation/
 *
 * Fonts:
 *  - Comforter: https://fonts.google.com/specimen/Comforter?query=comforter
 *  - Bebas: https://fonts.google.com/specimen/Bebas+Neue?query=bebas
 */

let date;

let perlinFont;
let speedoFont;

let indicators;
let dashboard;
let pedal;

let allColors;

let currentHour;

let vehicle;

let isAccelerating = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  pixelDensity(1);
  angleMode(DEGREES);

  allColors = {
    dashboard: {
      primary: new CustomColor(color(0, 200, 0), -10, color(0, 100, 0)),
      speedoOuter: new CustomColor(color(192, 192, 192)),
      speedoOuter2: new CustomColor(color(84, 83, 83)),
      speedoShadow: new CustomColor(color("black")),
      speedoBackground: new CustomColor(color(51)),
      redTicks: new CustomColor(color(250, 0, 0), -10, color(80, 0, 0)),
    },
    background: {
      gradientFrom: new CustomColor(color(20), 20),
      gradientTo: new CustomColor(color(180)),
    },
    indicators: {
      inactive: new CustomColor(color(229, 255, 0, 1)),
      active: new CustomColor(
        color(229, 255, 0, 255),
        -5,
        color(209, 235, 0, 235)
      ),
    },
  };

  indicators = new Indicators(
    allColors.indicators.active.current,
    allColors.indicators.inactive.current
  );
  indicators.turnOnIndicatorAnimation();
  dashboard = new Dashboard(allColors.dashboard);
  vehicle = new Vehicle();
  pedal = new Pedal();

  perlinFont = loadFont("assets/Comforter-Regular.ttf");
  speedoFont = loadFont("assets/BebasNeue-Regular.ttf");

  date = new Date();
  currentHour = date.getHours();
  changeColorsInitial();
}

function draw() {
  date = new Date();
  date.setMilliseconds(date.getMilliseconds() + vehicle.speed.x);
  dashboard.setTime(date);

  if (currentHour !== date.getHours()) {
    currentHour = date.getHours();
    changeColors(currentHour);
  }

  vehicle.update();
  if (isAccelerating) {
    vehicle.applyForce(createVector(100, 0));
  } else {
    const c = 0.5;
    const friction = vehicle.vel.copy();
    friction.mult(-1);
    friction.normalize;
    friction.mult(c);
    vehicle.applyForce(friction);
  }

  drawBackground();
  translate(width / 2, height / 2);

  pedal.draw();
  pedal.showPedalCursor();

  indicators.drawLeft();
  indicators.drawRight();

  dashboard.drawLeftSpeedo();
  dashboard.drawCenterSpeedo();
  dashboard.drawRightSpeedo();
}

function mousePressed() {
  if (pedal.isCursorInsidePedal()) {
    isAccelerating = true;
  }
}

function mouseReleased() {
  isAccelerating = false;
}

function drawBackground() {
  const from = allColors.background.gradientFrom.current;
  const to = allColors.background.gradientTo.current;
  // Draw gradient background (black -> white)
  for (let y = -500; y < height; y++) {
    const val = map(y, 0, height, 0, 1);
    let gradient = lerpColor(from, to, val);
    stroke(gradient);
    line(0, y + 500, width, y);
  }

  // Draw black arc on top of screen
  push();
  translate(width / 2, height / 2);
  rotate(180);
  noFill();
  strokeWeight(425);
  stroke(0);
  arc(0, 0, width + 550, height + 100, 0, 180, 10);
  pop();
}

function changeColors(h) {
  if (h >= 14) {
    iterateOverAllColors((customCol) => customCol.makeDarker());
  } else if (h >= 0) {
    iterateOverAllColors((customCol) => customCol.makeBrighter());
  }
}

function iterateOverAllColors(callback) {
  Object.keys(allColors).forEach((colorMain) => {
    Object.keys(allColors[colorMain]).forEach((col) => {
      const customCol = allColors[colorMain][col];
      callback(customCol);
    });
  });
}

function changeColorsInitial() {
  const hour = date.getHours();
  const transformFun = getTransformFun(hour);
  iterateOverAllColors((customCol) => {
    transformFun(customCol);
  });
}

/**
 * Returns a function, that makes a CustomColor x-times brighter and y-times darker, depending on the current time, to set the initital colors
 * @param {number} hour - the current hour
 * @returns {function}
 */
function getTransformFun(hour) {
  if (hour >= 14 && hour <= 24) {
    let d = hour - 14;
    transformFun = (customCol) => {
      for (let i = 0; i < d; i++) {
        customCol.makeDarker();
      }
    };
  } else if (hour < 14 && hour >= 0) {
    d = hour;
    transformFun = (customCol) => {
      for (let i = 0; i < 10; i++) {
        customCol.makeDarker();
      }
      for (let i = 0; i < d; i++) {
        customCol.makeBrighter();
      }
    };
  }
  return transformFun;
}
