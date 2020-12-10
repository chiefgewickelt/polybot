import { Point } from "./Point";

export type Edge = {
  edgeIdx: number;
  prevPoint: Point;
  nextPoint: Point;
};
