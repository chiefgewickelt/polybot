import { calcDirectionVector } from "src/geometry/calcDirectionVector";
import { calcVectorLength } from "src/geometry/calcVectorLength";
import { ActionDefinition } from "src/type/ActionDefinition";
import { Point } from "src/type/Point";
import { State } from "src/type/State";

type MouseMoveAction = {
  type: string;
  mousePos: Point;
};

const type = "MOUSE_MOVE";

function create(e: React.MouseEvent<HTMLElement, MouseEvent>): MouseMoveAction {
  return {
    type,
    mousePos: {
      x: e.clientX,
      y: e.clientY,
    },
  };
}

function handle(state: State, action: MouseMoveAction): State {
  const { mousePos } = action;

  const from = state.selfPos;
  const to = mousePos;

  const { dx, dy } = calcDirectionVector(from, to);
  const travelLength = calcVectorLength({ dx, dy });
  const travelAngleInRadian =
    travelLength > 0 ? Math.atan2(dy, dx) : state.travelAngleInRadian;

  return {
    ...state,
    mousePos,
    travelAngleInRadian,
  };
}

export const mouseMoveAction: ActionDefinition = {
  type,
  create,
  handle,
};
