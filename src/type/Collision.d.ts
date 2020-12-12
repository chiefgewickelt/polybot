import { Point } from "./Point";
import { Edge } from "./Edge";

export type Collision = {
  edge: { prevPoint: Point; nextPoint: Point };
  tau: number;
  mu: number;
  isReal: boolean;
  collisionPoint: Point;
};