// class used to store a color and make it brighter/darker, while constraining it to a given or default min/max
class CustomColor {
  constructor(main, step, maxDark) {
    this.step = step || 10;
    this.maxDark = maxDark;
    // the main color
    this.main = main;
    // the current color after making it brighter/darker
    this.current = color(
      this.main.levels[0],
      this.main.levels[1],
      this.main.levels[2],
      this.main.levels[3]
    );
    this.rStep = this.main.levels[0] / this.step;
    this.gStep = this.main.levels[1] / this.step;
    this.bStep = this.main.levels[2] / this.step;
  }

  makeDarker() {
    const r = this.current.levels[0] - this.rStep;
    const g = this.current.levels[1] - this.gStep;
    const b = this.current.levels[2] - this.bStep;
    this.current.setRed(
      constrain(r, this.maxDark ? this.maxDark.levels[0] : 0, 255)
    );
    this.current.setGreen(
      constrain(g, this.maxDark ? this.maxDark.levels[1] : 0, 255)
    );
    this.current.setBlue(
      constrain(b, this.maxDark ? this.maxDark.levels[2] : 0, 255)
    );
  }

  makeBrighter() {
    const r = this.current.levels[0] + this.rStep;
    const g = this.current.levels[1] + this.gStep;
    const b = this.current.levels[2] + this.bStep;
    this.current.setRed(
      constrain(
        r,
        this.maxDark ? this.maxDark.levels[0] : 0,
        this.main.levels[0]
      )
    );
    this.current.setGreen(
      constrain(
        g,
        this.maxDark ? this.maxDark.levels[1] : 0,
        this.main.levels[1]
      )
    );
    this.current.setBlue(
      constrain(
        b,
        this.maxDark ? this.maxDark.levels[2] : 0,
        this.main.levels[2]
      )
    );
  }
}
