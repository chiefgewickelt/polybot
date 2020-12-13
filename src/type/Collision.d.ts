import { Edge } from "./Edge";
import { Point } from "./Point";

export type Collision = {
  edge: Edge;
  tau: number;
  mu: number;
  isReal: boolean;
  collisionPoint: Point;
};
