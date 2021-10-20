/*
  Quellenangaben:

  - Grundkonzept (Schwarz/Weiß Muster mit Hilfe von Perlin-Noise)
    Daniel Shiffman, I.5: 2D Noise - Perlin Noise and p5.js Tutorial
    Video auf YouTube: https://youtu.be/ikwNrFvnL3g
*/

function setup() {
  createCanvas(200, 200);
  noiseDetail(5);
  pixelDensity(1);

  blendMode(OVERLAY);

  // Der Gedanke ist es, mehrere Schichten mit verschiedenen Mustern zu malen. Dabei soll jede Schicht eine Kombination
  // aus verschiedenen Farben darstellen. So hat bspw. die erste Schicht Farben, deren Rot- und Blauwert zwischen 0-255 und 
  // deren Grünwerte immer gleich 0 sind. Der letzte Parameter sorgt dafür, dass die Farben jeder Schicht eine andere 
  // durchschnittliche Transparenz besitzen.
  drawColors(0, ["r", "g"], 1);
  drawColors(25, ["g", "b"], 2);
  drawColors(50, ["b", "r"], 1);
  drawColors(100, ["r", "g"], 4);
}

/**
 * Iterates over every pixel in the canvas and uses the perlin-noise function and the given colors array to draw a color.
 * @param {number} z - value used as the third argument in the perlin-noise function
 * @param {string[]} colors - list of colors (only 'r', 'g', or 'b' possible) to draw in this iteration
 * @param {number} div - the randomly decided transparency will be divided by this value, used to influence the mean alpha
 */
function drawColors(z, colors, div) {
  const hasR = colors.includes("r");
  const hasG = colors.includes("g");
  const hasB = colors.includes("b");
  let xoff = 0;
  for (let x = 0; x <= width; x++) {
    let yoff = 0;
    for (let y = 0; y <= height; y++) {
      // Nutzung des dritten Parameters um mehrere "Schichten" aufeinander zu legen
      const rand = map(noise(xoff, yoff, z), 0, 1, 0, 255);
      const red = hasR ? rand : 0;
      const green = hasG ? rand : 0;
      const blue = hasB ? rand : 0;
      stroke(red, green, blue, rand / div);
      point(x, y);
      yoff += 0.01;
    }
    xoff += 0.01;
  }
}
