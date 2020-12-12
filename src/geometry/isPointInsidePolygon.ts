import { Point } from "src/type/Point";
import { detectRealCollisions } from "./detectRealCollisions";
import { polygonToEdges } from "./polygonToEdges";

export function isPointInsidePolygon(
  candidatePoint: Point,
  polygon: Point[]
): boolean {
  if (polygon.length === 0) return false;

  const outsidePoint = {
    x: 1 + Math.max(...polygon.map((corner) => corner.x)),
    y: 1 + Math.max(...polygon.map((corner) => corner.y)),
  };

  // FIXME: this implementation fails if the ray hits a corner
  const from = outsidePoint;
  const edges = polygonToEdges(polygon);
  const to = candidatePoint;

  const collisions = detectRealCollisions(from, edges, to);

  return collisions.length % 2 === 1;
}
