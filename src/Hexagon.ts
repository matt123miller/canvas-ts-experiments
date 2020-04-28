
import { deg2rad, createPolygonVertices } from "./utils";
import { Point, Polygon } from "./Interfaces";
// Is this in screen space or made up hex space?

export enum HexagonOrientation {
  Flat,
  Point
}

export class Hexagon implements Polygon {

  x: number;
  y: number;
  vertices: Point[];
  /**
   * Creates a new hexagon object
   * Should I consider a constructor that accepts an object instead?
   */
  constructor(
    public centre: Point,
    private readonly radius: number,
    private readonly orientation = HexagonOrientation.Flat,
    private readonly color = 'white'
  ) {
    this.radius = radius ? radius : 25;
    this.orientation = orientation;
    this.color = color;
    this.placeAt(centre);
  }

  placeAt(point: Point): void {
    this.centre = point;
    this.x = point.x;
    this.y = point.y;
    this.vertices = this.createVertices();
  }

  /**
   * We're going for flat topped hexagons
   */
  createVertices(): Point[] {

    const offsetAngle = this.orientation == HexagonOrientation.Flat ? 30 : 0;
    // I can always provide a custom implementation later if needs be
    return createPolygonVertices(6, this.centre, this.radius, offsetAngle);
  }

  /**
   * Draws, colors, and fills a hexagon.
   * The hexagon vertices are independantly placed by calling placeAt() so this just
   * draws whatever is in the vertices array
   * @param ctx the HTML Canvas's 2D rendering context
   */
  draw(ctx: CanvasRenderingContext2D) {

    // Draws a hexagon
    ctx.beginPath();

    const initialPoint = this.vertices[0];
    ctx.moveTo(initialPoint.x, initialPoint.y);

    this.vertices.forEach(({ x, y }) => {
      ctx.lineTo(x, y);
    })

    ctx.lineTo(initialPoint.x, initialPoint.y)

    ctx.stroke();

    ctx.closePath();

    // Colors and fills the hexagon
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}