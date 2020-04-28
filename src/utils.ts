import { Point } from "./Interfaces";

export const deg2rad = (deg: number) => (deg) * (Math.PI / 180);

/**
 * @param length
 * @returns An array of numbers from 0 to {length} - 1 
 * @example 
 * // Returns [0,1,2,3]
 * range(4)
 */
export const range = (length: number) => Array.from(Array(length).keys());

export const createPolygonVertices = (nSides:number, centre: Point, radius:number, offsetAngle:number = 0) : Point[] => {

  const angleBetweenPoints = 360 / nSides;
  const sides = range(nSides);
  console.log(sides);
  return sides.map(i => {

    const deg = angleBetweenPoints * i + offsetAngle;
    const rad = deg2rad(deg);

    const x = centre.x + Math.sin(rad) * radius;
    const y = centre.y + Math.cos(rad) * radius;
    return { x, y };
  });
}