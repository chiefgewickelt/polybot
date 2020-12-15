import { makePolygon } from "src/geometry/makePolygon";
import { Point } from "src/type/Point";
import { Dim, State } from "src/type/State";

type ResetAction = {
  type: string;
  playerName: string;
  spawnPos: Point;
  travelAngleInRadian: number;
  dim: Dim;
};

const type = "RESET";

export type ResetArgs = { playerName: string; spawnPos?: Point };
function create({ playerName, ...args }: ResetArgs): ResetAction {
  const spawnPos = args.spawnPos ?? {
    x: 250 * Math.random(),
    y: 250 * Math.random(),
  };

  const travelAngleInRadian = Math.random() * 2 * Math.PI - Math.PI;

  const dim = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  return {
    type,
    playerName,
    spawnPos,
    travelAngleInRadian,
    dim,
  };
}

function handle(state: State | undefined, action: ResetAction): State {
  const { playerName, spawnPos: selfPos, dim, travelAngleInRadian } = action;

  return {
    name: playerName,
    totalNumberOfClicks: 0,
    gameStartedAt: Date.now(),
    selfPos,
    travelAngleInRadian,
    conquerLine: null,
    conquerStart: null,
    mousePos: { x: 0, y: 0 },
    home: makePolygon(123, 71, selfPos),
    collisions: [],
    isAlive: true,
    dim,
  };
}

export const resetAction = {
  type,
  create,
  handle,
};
