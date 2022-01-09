/*
  - Konzept von arrive
    Daniel Shiffman: Coding Challenge #59: Steering Behaviors
    Video auf YouTube: https://www.youtube.com/watch?v=4hA7G3gup-4
  - Grundidee des Feuerwerks
    Daniel Shiffman: Coding Challenge #27: Fireworks!
    Video auf YouTube: https://youtu.be/CKeyIbT3vXI
*/

let fireworks = [];

let gravityForce;

let rocketImg;
let robotoFont;

const letters = ["p", "e", "r", "l", "i", "n"];

let shoot = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Quelle: https://pixabay.com/vectors/rocket-sylvester-fireworks-1897774/?download
  rocketImg = loadImage("assets/rocket.svg");
  // Font von Google: https://fonts.google.com/specimen/Roboto+Mono
  robotoFont = loadFont("assets/RobotoMono-Regular.ttf");
  textFont(robotoFont);
  textSize(150);

  gravityForce = createVector(0, 0.2);
  initFirework(0);
}

function draw() {
  background(0);

  if (random() < 0.125 && shoot) {
    fireworks.push(createFirework());
  }
  fireworks = fireworks
    .map((firework) => {
      firework.update();
      firework.show();
      return firework;
    })
    .filter((firework) => !firework.isDone());
}

function initFirework(i) {
  setTimeout(() => {
    if (i === letters.length) {
      setTimeout(() => {
        shoot = true;
      }, 1500);
    } else {
      fireworks.push(
        new LetterFirework(
          crazyParticleGenerator,
          letters[i],
          200 + 200 * i,
          height
        )
      );
      initFirework(i + 1);
    }
  }, 1250);
}

function createFirework() {
  const rand = Math.floor(random(generators.length));
  let generator = generators[rand];
  return new Firework(generator);
}

function explodingParticleGenerator(x, y, color) {
  return Array.from({ length: 150 }).map((o, i) => {
    return new ExplodingParticle(x, y, color, i);
  });
}

function heartParticleGenerator(x, y, color) {
  return Array.from({ length: 30 }).map((o, i) => {
    return new HeartParticle(x, y, color, i);
  });
}

function slowParticleGenerator(x, y, color) {
  return Array.from({ length: 80 }).map((o, i) => {
    return new SlowlyExplodingParticle(x, y, color, i);
  });
}

function oneSideParticleGenerator(x, y, color) {
  const rand = random();
  return Array.from({ length: 80 }).map((o, i) => {
    return new OneSideExplodingParticle(x, y, color, rand);
  });
}

function crazyParticleGenerator(x, y, color) {
  return Array.from({ length: 80 }).map((o, i) => {
    return new CrazyExplodingParticle(x, y, color, i);
  });
}

const generators = [
  explodingParticleGenerator,
  heartParticleGenerator,
  slowParticleGenerator,
  oneSideParticleGenerator,
  crazyParticleGenerator,
];
