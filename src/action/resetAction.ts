import { makePolygon } from "src/geometry/makePolygon";
import { Point } from "src/type/Point";
import { State } from "src/type/State";

type ResetAction = {
  type: string;
  playerName: string;
  spawnPos: Point;
};

const type = "RESET";

export type ResetArgs = { playerName: string; spawnPos?: Point };
function create({ playerName, ...args }: ResetArgs): ResetAction {
  const spawnPos = args.spawnPos ?? {
    x: 250 * Math.random(),
    y: 250 * Math.random(),
  };

  return {
    type,
    playerName,
    spawnPos,
  };
}

function handle(state: State | undefined, action: ResetAction): State {
  const { playerName, spawnPos: selfPos } = action;

  return {
    name: playerName,
    totalNumberOfClicks: 0,
    gameStartedAt: Date.now(),
    selfPos,
    travelAngleInRadian: 0,
    conquerLine: null,
    mousePos: { x: 0, y: 0 },
    home: makePolygon(13, 71, selfPos),
    collisions: [],
    isAlive: true,
  };
}

export const resetAction = {
  type,
  create,
  handle,
};
