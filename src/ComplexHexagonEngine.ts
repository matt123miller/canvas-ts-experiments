import { Hexagon, HexagonOrientation } from "./Hexagon";
import { HexagonEngine } from "./Interfaces";



export default class ComplexHexagonEngine implements HexagonEngine {

  private readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;
  private readonly hexagons = new Array<Hexagon>(); // is this idiomatic?
  private playing = true;
  /**
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
      }
      // The difference between y values ofthe top point and the next point round clockwise
      for (let j = 0; j < columns.length; j++) {
        const c = columns[j];
        const x = xOffset + 75 + diameter * c;
        const y = yOffset + 50 + diameter * r;
        const hex = new Hexagon({ x, y }, radius, HexagonOrientation.Point, 'white');
        this.hexagons.push(hex);
      }
    }
    window.requestAnimationFrame(() => this.draw()); // start the animation when the window is ready
  }

  draw() {
    if (this.playing == false) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // erase
    const gradient = this.createGradient();
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
    this.hexagons.forEach(h => h.draw(this.ctx)); // draw the hexagon in the new position
  }

  createGradient() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
    gradient.addColorStop(0, '#34ed5c');
    gradient.addColorStop(0.5, 'red');
    gradient.addColorStop(0.75, 'blue');
    gradient.addColorStop(1, 'black');
    return gradient;
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
