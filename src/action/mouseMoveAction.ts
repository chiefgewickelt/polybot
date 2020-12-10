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
  return {
    ...state,
    mousePos: action.mousePos,
  };
}

export const mouseMoveAction: ActionDefinition = {
  type,
  create,
  handle,
};
