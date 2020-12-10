import { Point } from "src/type/Point";
import { State } from "src/type/State.d";
import { detectFirstCollisionWithPolyline } from "src/geometry/detectFirstCollisionWithPolyline";
import { ActionDefinition } from "src/type/ActionDefinition";
import { detectCollisionWithEdge } from "src/geometry/detectCollisionWithEdge";

type ClickAction = {
  type: string;
  mousePos: Point;
};

const type = "CLICK";

function create(e: React.MouseEvent<HTMLElement, MouseEvent>): ClickAction {
  return {
    type,
    mousePos: {
      x: e.clientX,
      y: e.clientY,
    },
  };
}

function handle(state: State, action: ClickAction): State {
  const totalNumberOfClicks = state.totalNumberOfClicks + 1;

  if (!state.isAlive) {
    return { ...state, totalNumberOfClicks };
  }

  const isPlayerMovingToThatPosition = true;

  const selfPos = isPlayerMovingToThatPosition
    ? action.mousePos
    : state.selfPos;

  const conquerLine = state.conquerLine
    ? [...state.conquerLine, selfPos]
    : [state.selfPos, selfPos];

  const collision = detectFirstCollisionWithPolyline(
    state.selfPos,
    conquerLine.slice(0, conquerLine.length - 2),
    action.mousePos
  );

  if (collision) {
    return {
      ...state,
      totalNumberOfClicks,
      selfPos,
      conquerLine,
      isAlive: false,
      collisions: [...state.collisions, collision],
    };
  }

  const homeEdges = [
    ...state.home
      .map((_, indx) => indx)
      .slice(1)
      .map((endIndx) => ({
        prevPoint: state.home[endIndx - 1],
        nextPoint: state.home[endIndx],
      })),
    {
      //edge connecting last and first point:
      prevPoint: {
        x: state.home[state.home.length - 1].x,
        y: state.home[state.home.length - 1].y,
      },
      nextPoint: {
        x: state.home[0].x,
        y: state.home[0].y,
      },
    },
  ];
  const realCollisionsWithHomeEdges = homeEdges
    .map((homeEdge) =>
      detectCollisionWithEdge(state.selfPos, homeEdge, action.mousePos)
    )
    .filter(({ isReal }) => isReal);
  console.log("homeCollisions:");
  console.log(realCollisionsWithHomeEdges);

  return {
    ...state,
    totalNumberOfClicks,
    selfPos,
    conquerLine,
  };
}

export const clickAction: ActionDefinition = {
  type,
  create,
  handle,
};
