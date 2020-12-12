import { Edge } from "src/type/Edge";
import { Point } from "src/type/Point";
import { polygonToEdges } from "./polygonToEdges";

export function polylineToEdges(polyline: Point[]): Edge[] {
  const edges = polygonToEdges(polyline);
  edges.pop();
  return edges;
}
