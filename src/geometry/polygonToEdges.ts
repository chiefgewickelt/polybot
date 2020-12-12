import { Edge } from "src/type/Edge";
import { Point } from "src/type/Point";

export function polygonToEdges(polygon: Point[]): Edge[] {
  const edgeCount = polygon.length;
  const edgeInds = [...Array(edgeCount).keys()];
  return edgeInds.map((edgeIdx) => ({
    edgeIdx: edgeIdx,
    prevPoint: polygon[edgeIdx],
    nextPoint: polygon[(edgeIdx + 1) % edgeCount],
  }));
}
