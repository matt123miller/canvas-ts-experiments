
export interface Renderer {
  draw(): void;
  stop(): void;
  start(): void;
}

export interface HexagonEngine extends Renderer {
  createGradient(): CanvasGradient
}

// export HexagonEngine = HexagonEngine

export interface Point {
  readonly x: number;
  readonly y: number;
}

export interface Polygon {
  vertices: Point[];

  placeAt(point: Point): void;
  createVertices(): Point[];
  draw(ctx: CanvasRenderingContext2D): void;
}
