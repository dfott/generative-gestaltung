let font;
let points;
let vehicles = [];
const letters = [];

function preload() {
  font = loadFont("RobotoMono-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(51);
  textFont(font);
  textSize(192);
  fill(255);
  noStroke();
  //   text("train", 100, 200);

  const chars = "train".split("");
  let count = 0;
  chars.forEach((c) => {
    points = font.textToPoints(c, 25 + count, 200);
    count += 125;
    letters.push(new Letter(points, "blue"));
    // points.forEach((pt) => {
    // stroke(0, 255, 0);
    // strokeWeight(4);
    // point(pt.x, pt.y);
    //   vehicles.push(new Vehicle(pt.x, pt.y));
    // });
  });
  //   points = font.textToPoints("train", 100, 200);
  //   points.forEach((pt) => {
  //     // stroke(0, 255, 0);
  //     // strokeWeight(4);
  //     // point(pt.x, pt.y);
  //     vehicles.push(new Vehicle(pt.x, pt.y));
  //   });
}

function draw() {
  background(51);
  letters.forEach((letter) => {
    letter.show();
  });
  //   vehicles.forEach((v) => {
  //     v.update();
  //     v.behaviors();
  //     v.show();
  //   });
}
