// Bild https://pixabay.com/photos/mercedes-car-auto-luxury-vehicle-1229233/

let date;
let img;

let perlinFont;
let speedoFont;

let indicators;
let dashboard;
let pedal;

let allColors;

let slider;

let currentHour;

let vehicle;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(2);
  date = new Date(Date.parse("2021-01-01T08:15:12Z"));
  img = loadImage("assets/image.jpg");
  angleMode(DEGREES);
  background(255);

  allColors = {
    dashboard: {
      primary: new CustomColor(color(0, 200, 0), -10, color(0, 100, 0)),
      speedoOuter: new CustomColor(color(192, 192, 192)),
      speedoOuter2: new CustomColor(color(84, 83, 83)),
      speedoShadow: new CustomColor(color("black")),
      speedoBackground: new CustomColor(color(51)),
    },
    background: {
      gradientFrom: new CustomColor(color(20), 20),
      gradientTo: new CustomColor(color(180)),
    },
  };

  indicators = new Indicators(color(229, 255, 0, 255), color(229, 255, 0, 1));
  indicators.turnOnIndicatorAnimation();
  dashboard = new Dashboard(allColors.dashboard);
  vehicle = new Vehicle();
  pedal = new Pedal();
  perlinFont = loadFont("assets/Comforter-Regular.ttf");
  speedoFont = loadFont("assets/BebasNeue-Regular.ttf");

  slider = createSlider(0, 24, 1);
  slider.position(10, 10);
  date = new Date();
  // date.setHours(slider.value());
  currentHour = date.getHours();
  changeColorsInitial();
}

function draw() {
  date = new Date();
  date.setMilliseconds(date.getMilliseconds() + vehicle.speed);
  // date.setHours(slider.value());
  dashboard.setTime(date);

  if (currentHour !== date.getHours()) {
    currentHour = date.getHours();
    changeColors(currentHour);
  }

  vehicle.update();
  if (isAccelerating) {
    vehicle.applyForce(100);
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

let isAccelerating = false;

function mousePressed() {
  if (pedal.isCursorInsidePedal()) {
    isAccelerating = true;
  }
}

function mouseReleased() {
  isAccelerating = false;
}

function drawBackground() {
  let c1 = allColors.background.gradientFrom.current;
  let c2 = allColors.background.gradientTo.current;
  // Draw gradient background (black -> white)
  for (let y = -500; y < height; y++) {
    n = map(y, 0, height, 0, 1);
    let newc = lerpColor(c1, c2, n);
    stroke(newc);
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
    iterateOverAllColors((customCol) => customCol.makeLighter());
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

function getTransformFun(hour) {
  if (hour >= 14 && hour <= 24) {
    d = hour - 14;
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
        customCol.makeLighter();
      }
    };
  }
  return transformFun;
}
