import { Point } from "src/type/Point";

export function makePolygon(
  n: number,
  distCenterCorner: number,
  center: Point
) {
  if (n < 3) {
    throw new Error("area needs at least 3 corners");
  }
  const dPhi = (2 * Math.PI) / n;
  return [...Array(n).keys()].map((i) => ({
    x: center.x + distCenterCorner * Math.cos(i * dPhi),
    y: center.y + distCenterCorner * Math.sin(i * dPhi),
  }));
}
