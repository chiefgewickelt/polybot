import { Vector } from "src/type/Vector";

export function calcVectorLength({ dx, dy }: Vector) {
  return Math.sqrt(dx * dx + dy * dy);
}
