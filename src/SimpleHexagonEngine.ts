import { Hexagon, HexagonOrientation } from "./Hexagon";
import { HexagonEngine } from "./Interfaces";

export default class SimpleHexagonEngine implements HexagonEngine {
  private readonly ctx: CanvasRenderingContext2D; // HTML Canvas's 2D context
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;
  private readonly hex: Hexagon;
  private playing = false;

  /**
   * Creates a single hexagon draw on the supplied canvas
   * @param canvas the HTML Canvas on which to draw
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;

    const radius = 100;
    const diameter = radius * 2;

    const x = radius * 3 + diameter;
    const y = radius * 3 + diameter;
    this.hex = new Hexagon({ x, y }, radius);

    window.requestAnimationFrame(() => this.draw()); // start the animation when the window is ready
  }

  draw() {
    if (this.playing == false) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // erase canvas contents

    this.ctx.fillStyle = this.createGradient()
    this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
    this.hex.draw(this.ctx);
  }

  createGradient() {
    const gradient = this.ctx.createLinearGradient(0, 0, this.canvasWidth, this.canvasHeight);
    gradient.addColorStop(0, '#34aaaa');
    gradient.addColorStop(1, '#34ffff');
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
