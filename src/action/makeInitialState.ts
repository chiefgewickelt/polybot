import { makePolygon } from "src/geometry/makePolygon";
import { State } from "src/type/State";

export function makeInitialState(): State {
  const selfPos = {
    x: 250 * Math.random(),
    y: 250 * Math.random(),
  };
  return {
    name: "Player",
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
