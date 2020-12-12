import { Point } from "src/type/Point";
import { Vector } from "src/type/Vector";

export function calcDirectionVector(from: Point, to: Point): Vector {
  return {
    dx: to.x - from.x,
    dy: to.y - from.y,
  };
}
