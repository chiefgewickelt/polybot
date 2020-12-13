import { Collision } from "./Collision";
import { Point } from "./Point";

type Dim = {
  width: number;
  height: number;
};

export type State = {
  name: string;
  totalNumberOfClicks: number;
  gameStartedAt: number;
  selfPos: Point;
  travelAngleInRadian: number;
  conquerLine: Point[] | null;
  home: Point[];
  collisions: Collision[];
  mousePos: Point;
  isAlive: boolean;
  dim: Dim;
};
