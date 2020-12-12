import { Collision } from "src/type/Collision";
import { Edge } from "src/type/Edge";
import { Point } from "src/type/Point";
import { detectCollision } from "./detectCollision";

export function detectRealCollisions(
  from: Point,
  edges: Edge[],
  to: Point
): Collision[] {
  return edges
    .map((edge) => detectCollision(from, edge, to))
    .filter(({ isReal }) => isReal);
}
