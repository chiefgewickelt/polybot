import { Collision } from "./Collision";
import { Point } from "./Point";

export type State = {
  name: string;
  totalNumberOfClicks: number;
  gameStartedAt: number;
  selfPos: Point;
  conquerLine: Point[] | null;
  home: Point[];
  collisions: Collision[];
  mousePos: Point;
  isAlive: boolean;
};