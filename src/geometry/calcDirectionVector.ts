import { Point } from "src/type/Point";


export const calcDirectionVector = (from: Point, to: Point) => ({
  dx: to.x - from.x,
  dy: to.y - from.y,
});
