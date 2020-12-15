import _ from "lodash";
import {
  detectPolygonSense,
  PolygonSense,
  calcSignedPolygonArea
} from "src/geometry/detectPolygonSense";
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
  const selfPos = homeCollision.collisionPoint;
  const startIdx = state.conquerStart?.edge?.edgeIdx;
  const endIdx = homeCollision.edge.edgeIdx;
  if (startIdx === undefined || endIdx === undefined) {
    throw new Error("undefined start or end");
  }
  if ( startIdx === endIdx) {
    throw new Error('end === start in handleConquerCommit');
  }

  const minIdx = Math.min(startIdx, endIdx);
  const maxIdx = Math.max(startIdx, endIdx);
  const home0ToMin = state.home.slice(0,minIdx+1);
  const homeMinToMax = state.home.slice(minIdx+1, maxIdx);
  const homeMaxToEnd = state.home.slice(maxIdx);
  

  const line1 = [
    ...state.conquerLine,
    ...homeMinToMax.reverse()
  ];
  homeMinToMax.reverse();//turn back to normal order 
  const line2 = [
    ...state.conquerLine,
    ...homeMaxToEnd,
    ...home0ToMin
  ];
const flippedLine1 = [  
  ...state.conquerLine,
  ...homeMinToMax
  ];
const flippedLine2 = [
  ...state.conquerLine,
  ...home0ToMin.reverse(),
  ...homeMaxToEnd.reverse()
];

  const area1 = minIdx === startIdx ? 
    Math.abs(calcSignedPolygonArea(line1)) : 
      Math.abs(calcSignedPolygonArea(flippedLine1));

  const area2 = minIdx ===startIdx ? 
    Math.abs(calcSignedPolygonArea(line2)) :
      Math.abs(calcSignedPolygonArea(flippedLine2));
if( area1 === area2) {
  throw new Error('dude this can really happen, this is the achillesHeal of this algorithm')
}
const home = minIdx === startIdx ? area1 > area2 ? line1 : line2
: area1 > area2 ? flippedLine1 : flippedLine2;


  const conquerLine = null;
  const collisions = [...state.collisions, homeCollision];
  return { ...state, home, conquerLine, selfPos, collisions };
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
  const conquerStart = homeCollision;
  const collisions = [...state.collisions, homeCollision];
  return { ...state, conquerLine, conquerStart, collisions };
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
