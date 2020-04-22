
const deg2rad = (deg: number) => (deg) * (Math.PI / 180);



class Hexagon {
  centre: { x: number; y: number; };
  /**
   * Creates a new hexagon object
   * @param x the initial central x position of the hexagon (relative to the top left corner of the Canvas).
   * @param y the initial central y position of the hexagon (relative to the top right corner of the Canvas).
   * @param radius 
   * @param color 
   */
  constructor(
    public x = 100,
    public y = 100,
    private readonly radius = 25,
    private readonly color = 'blue'
  ) {
    this.centre = {
      x, y
    }
  }

  /**
   * Draws, colors, and fills a hexagon using the parameters given in the constructor
   * @param ctx the HTML Canvas's 2D rendering context
   */
  draw(ctx: CanvasRenderingContext2D) {

    // Draws a hexagon
    ctx.beginPath();
    // x and y define the centre of the hex
    ctx.moveTo(this.x, this.y + this.radius);
    const points = [0, 1, 2, 3, 4, 5, 6];
    // make the lines, ending the the start point defined above
    for (let i = 0; i < points.length; i++) {
      const mult = points[i]
      const deg = 60 * mult;
      const rad = deg2rad(deg);

      const x = this.x + Math.sin(rad) * this.radius;
      const y = this.y + Math.cos(rad) * this.radius;
      // console.log({x,y, deg, rad});

      mult == 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.stroke();

    ctx.closePath();

    // Colors and fills the hexagon
    ctx.fillStyle = this.color;
    ctx.fill();
  }

}

export default class Hexagons {
  private readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number;
  private readonly canvasHeight: number; 
  private readonly hexagons = new Array<Hexagon>(); // is this idiomatic?

  private playing = true;
  /**
   * Creates a new animation and sets properties of the animation
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    const rows = [1, 2, 3];
    const columns = [1, 2, 3];
    const radius = 25;
    const diameter = radius * 2;

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];
      const xOffset = r % 2 == 0 ? 0 : radius;
      let yOffset: number;

      if (i == 0) {
        yOffset = 0;
      }
      else {
        // yOffset = (Math.cos(deg2rad(180)) * radius) - (Math.cos(deg2rad(120)) * radius)
        // console.log({ y1: yOffset });

        yOffset = radius * -0.5;
        console.log({ y2: yOffset });

      }
      // The difference between y values ofthe top point and the next point round clockwise

      for (let j = 0; j < columns.length; j++) {

        const c = columns[j];

        const x = xOffset + 75 + diameter * c;
        const y = yOffset + 50 + diameter * r;
        const hex = new Hexagon(x, y, radius, 'white');
        this.hexagons.push(hex);

        console.log({ xOffset, yOffset });

      }
    }

    window.requestAnimationFrame(() => this.draw()); // start the animation when the window is ready
    // this.draw()
  }

  /**
   * Draw step of the animation
   */
  draw() {
    if (this.playing == false) {
      return;
    }

    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // erase

    const gradient = this.ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight)
    gradient.addColorStop(0, '#34ed5c');
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(0.75, 'blue');
    gradient.addColorStop(1, 'black');
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
    this.hexagons.forEach(h => h.draw(this.ctx)); // draw the hexagon in the new position

    // window.requestAnimationFrame(() => this.draw()); // repeat the draw step when the window requests a frame
  }

  stop() {
    this.playing = false;
  }

  start() {
    // to avoid making it start drawing twice
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.draw();
  }
}
