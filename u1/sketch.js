function setup() {
  createCanvas(200, 200);
  pixelDensity(1);

  blendMode(OVERLAY);

  drawColors(0, ["r", "g"], 1);
  drawColors(25, ["g", "b"], 2);
  drawColors(50, ["b", "r"], 1, 2);
  drawColors(100, ["r", "g"], 4);
}

function drawColors(z, colors, div) {
  const hasR = colors.includes("r");
  const hasG = colors.includes("g");
  const hasB = colors.includes("b");
  let xoff = 0;
  for (let x = 0; x <= width; x++) {
    let yoff = 0;
    for (let y = 0; y <= height; y++) {
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
