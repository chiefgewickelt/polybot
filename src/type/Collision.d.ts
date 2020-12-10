import { Point } from "./Point";
import { Edge } from "./Edge";


export type Collision = {
  edge: Edge;
  tau: number;
  mu: number;
  isReal: boolean;
  collisionPoint: Point;
};
