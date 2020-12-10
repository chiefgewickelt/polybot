import { Collision } from "src/type/Collision";
import { Edge } from "src/type/Edge";
import { Point } from "src/type/Point";
import { detectCollisionWithEdge } from "./detectCollisionWithEdge";

export function detectFirstCollisionWithPolyline(
  from: Point,
  polyline: Point[],
  to: Point
) {
  const edges: Edge[] = polyline
    .map((_, pointIdx) => pointIdx)
    .slice(1) // first point cannot be used as `nextPoint`
    .map((nextPointIdx) => ({
      edgeIdx: nextPointIdx - 1,
      prevPoint: polyline[nextPointIdx - 1],
      nextPoint: polyline[nextPointIdx],
    }));

  const realCollisions: Collision[] = edges
    .map((edge) => detectCollisionWithEdge(from, edge, to))
    .filter(({ isReal }) => isReal);

  const minimizeTau = (curr: Collision, next: Collision) =>
    next.tau < curr.tau ? next : curr;

  const initialCollision: Collision | undefined = realCollisions.shift();
  if (!initialCollision) return null;

  return realCollisions.reduce(minimizeTau, initialCollision);
}
