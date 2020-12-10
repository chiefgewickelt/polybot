import { Edge } from "src/type/Edge";
import { Point } from "src/type/Point";
import { calcDirectionVector } from "./calcDirectionVector";

type PrevAndNextPoint = { prevPoint: Point; nextPoint: Point };
export function detectCollisionWithEdge(
  from: Point,
  edge: PrevAndNextPoint,
  to: Point
) {
  const { prevPoint, nextPoint } = edge;

  const walkDirection = calcDirectionVector(from, to);
  const edgeDirection = calcDirectionVector(prevPoint, nextPoint);
  // from + tau * walkDirection = prevPoint + mu * edgeDirection
  const den =
    edgeDirection.dy * walkDirection.dx - edgeDirection.dx * walkDirection.dy;
  if (den === 0) {
    throw new Error("TODO: handle parallel and degenerate cases");
  }

  // tau * (edgeNormal, walkDirection) = (edgeNormal, prevPoint - from)
  const tauNum =
    edgeDirection.dy * (prevPoint.x - from.x) -
    edgeDirection.dx * (prevPoint.y - from.y);
  const tau = tauNum / den;
  const collisionPoint = {
    x: from.x + tau * walkDirection.dx,
    y: from.y + tau * walkDirection.dy,
  };

  // mu * (edgeNormal, walkDirection) = (walkNormal, prevPoint - from)
  const muNum =
    walkDirection.dy * (prevPoint.x - from.x) -
    walkDirection.dx * (prevPoint.y - from.y);
  const mu = muNum / den;

  return {
    edge,
    tau,
    mu,
    isReal: tau >= 0 && tau <= 1 && mu >= 0 && mu <= 1,
    collisionPoint,
  };
}
