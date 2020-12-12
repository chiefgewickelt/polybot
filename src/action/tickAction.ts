import _ from "lodash";
import { detectRealCollisions } from "src/geometry/detectRealCollisions";
import { polygonToEdges } from "src/geometry/polygonToEdges";
import { polylineToEdges } from "src/geometry/polylineToEdges";
import { ActionDefinition } from "src/type/ActionDefinition";
import { Collision } from "src/type/Collision";
import { Point } from "src/type/Point";
import { State } from "src/type/State.d";

type TickAction = {
  type: string;
};

const type = "TICK";

function create(): TickAction {
  return {
    type,
  };
}

enum CollisionPartner {
  ConquerLine,
  HomeGon,
}

type CollisionWithPartner = {
  partner: CollisionPartner;
  collision: Collision;
};

function handleMove(state: State, to: Point): State {
  const selfPos = to;
  const conquerLine = state.conquerLine
    ? [...state.conquerLine, selfPos]
    : null;
  return { ...state, selfPos, conquerLine };
}

function handleConquerCommit(state: State, homeCollision: Collision): State {
  if (!state.conquerLine) {
    throw new Error();
  }

  console.log("Congratulations! However, this feature is work in progress...");
  // TODO: consider recalculation of all collisions

  const selfPos = homeCollision.collisionPoint;
  const conquerLine = null;
  const collisions = [...state.collisions, homeCollision];
  return { ...state, conquerLine, selfPos, collisions };
}

function handleConquerCollision(state: State, selfCollision: Collision): State {
  if (!state.conquerLine) return state; // outdated collision (just after commit)

  const selfPos = selfCollision.collisionPoint;
  const conquerLine = [...state.conquerLine, selfPos];
  const collisions = [...state.collisions, selfCollision];
  return { ...state, selfPos, conquerLine, collisions, isAlive: false };
}

function handleHomeCollision(state: State, homeCollision: Collision): State {
  if (state.conquerLine) {
    return handleConquerCommit(state, homeCollision);
  }

  // FIXME: `homeCollision` might just be outdated due to a recent conquer commit

  const conquerLine = [homeCollision.collisionPoint];
  const collisions = [...state.collisions, homeCollision];
  return { ...state, conquerLine, collisions };
}

function handleCollisions(
  state: State,
  to: Point,
  ...collisions: CollisionWithPartner[]
): State {
  if (!state.isAlive) return state;

  const curr = collisions.shift();
  if (!curr) return handleMove(state, to);

  const collisionHandler = {
    [CollisionPartner.ConquerLine]: handleConquerCollision,
    [CollisionPartner.HomeGon]: handleHomeCollision,
  }[curr.partner];

  return handleCollisions(
    collisionHandler(state, curr.collision),
    to,
    ...collisions
  );
}

function handle(state: State, action: TickAction): State {
  if (!state.isAlive) return state;

  const phi = state.travelAngleInRadian;

  const velocity = 10; // TODO: compensate frame rate

  const from = state.selfPos;
  const to = {
    x: from.x + Math.cos(phi) * velocity,
    y: from.y + Math.sin(phi) * velocity,
  };

  const homeEdges = polygonToEdges(state.home);
  const homeCollisions = detectRealCollisions(from, homeEdges, to).map(
    (collision) => ({
      collision,
      partner: CollisionPartner.HomeGon,
    })
  );

  const conquerEdges = polylineToEdges(state.conquerLine ?? []);
  conquerEdges.pop(); // do not collide with current pos
  const selfCollisions = detectRealCollisions(from, conquerEdges, to).map(
    (collision) => ({
      collision,
      partner: CollisionPartner.ConquerLine,
    })
  );

  const collisions = _.sortBy(
    [...homeCollisions, ...selfCollisions],
    "collision.tau"
  );

  return handleCollisions(state, to, ...collisions);
}

export const tickAction: ActionDefinition = {
  type,
  create,
  handle,
};
