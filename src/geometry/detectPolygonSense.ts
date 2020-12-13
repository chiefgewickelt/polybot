import { polygonToEdges } from "src/geometry/polygonToEdges";
import { Edge } from "src/type/Edge";
import { Point } from "src/type/Point";

function calcSignedAreaUnderEdge(edge: Edge): number {
  const { nextPoint: next, prevPoint: prev } = edge;
  const y = 0.5 * (next.y + prev.y);
  const dx = next.x - prev.x;
  return y * dx;
}

function calcSignedPolygonArea(polygon: Point[]): number {
  const edges = polygonToEdges(polygon);
  return edges.map(calcSignedAreaUnderEdge).reduce((a, b) => a + b, 0);
}

export enum PolygonSense {
  positive,
  negative,
  degenerate,
}

export function detectPolygonSense(polygon: Point[]): PolygonSense {
  const signedPolygonArea = calcSignedPolygonArea(polygon);
  if (signedPolygonArea < 0) return PolygonSense.negative;
  if (signedPolygonArea > 0) return PolygonSense.positive;
  return PolygonSense.degenerate;
}
