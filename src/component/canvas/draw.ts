import { Collision } from "src/type/Collision";
import { Point } from "src/type/Point";
import { State } from "src/type/State";

type drawPolyLineArgs = {ctx: CanvasRenderingContext2D, points: Point[], offset?: Point};
function draw_poly_line({ctx, points, ...args}: drawPolyLineArgs) {
  const offset = args.offset ?? {x: 0 , y: 0};
  const tail = [...points];
  const head = tail.shift();
  if (!head) {
    throw new Error("zero points given");
  }
   ctx.moveTo(head.x + offset.x, head.y + offset.y);
  tail.forEach(({ x, y }) => ctx.lineTo(x + offset.x, y + offset.y));
   ctx.stroke();
}

type drawPlayerArgs = {ctx: CanvasRenderingContext2D, pos: Point, offset?: Point};
function draw_player({ctx, pos, ...args} : drawPlayerArgs) {
  const offset = args.offset ?? {x: 0, y: 0};
  const playerRadius = 7;// TODO better name
  const {x, y} = pos;
  ctx.fillRect(x + offset.x - playerRadius, y + offset.y - playerRadius, 2*playerRadius, 2*playerRadius);
}

type DrawCollisionArgs = {ctx: CanvasRenderingContext2D, collisions: Collision[], offset?: Point};
function draw_collisions({ctx,  collisions, ...args}: DrawCollisionArgs){
  const  offset = args.offset ?? {x: 0, y: 0};
  const radius = 10;
  ctx.fillStyle = "#000000";//TODO: dieser eintrag bestimmt auch farbe der Conquer line
  ctx.beginPath();
  collisions.forEach(({ collisionPoint: { x, y } }) => {
    ctx.moveTo(x + offset.x + radius, y + offset.y);
    ctx.arc(x + offset.x, y + offset.y, 10, 0, 2 * Math.PI);
  });
  ctx.fill();
}

type drawPolygonArgs = {ctx: CanvasRenderingContext2D, points: Point[], fillcolor: string, offset?: Point};
function draw_polygon({ctx, points, fillcolor, ...args}: drawPolygonArgs) {
const offset = args.offset ?? {x: 0 , y: 0};
  ctx.fillStyle = fillcolor;
  ctx.beginPath();
  points.forEach(({ x, y }) => {
    ctx.lineTo(x + offset.x, y + offset.y);
  });
  ctx.closePath();
  ctx.fill();
}

type drawMouseArgs = {ctx: CanvasRenderingContext2D, pos: Point, offset?: Point}
function draw_mouse({ctx, pos, ...args}: drawMouseArgs) {
  const offset = args.offset ?? {x:0, y:0};
  const {x, y} = pos;
  const radius = 4;
  ctx.beginPath();
  ctx.moveTo(x + offset.x + radius, y + offset.y);
  ctx.arc(x + offset.y , y + offset.y,  10, 0, 2 * Math.PI);
  ctx.fill();
}

export function draw(canvas: HTMLCanvasElement, state: State) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("invalid context");
  }
  const offset = {x :  canvas.width/2 - state.selfPos.x, y : canvas.height/2 - state.selfPos.y  };
  draw_polygon({ctx, points: state.home, fillcolor: "#11cc33", offset});
  draw_collisions({ctx, collisions: state.collisions, offset});
  draw_player({ctx, pos: state.selfPos, offset});
  //draw_mouse({ctx, pos: state.mousePos, offset: {x: -offset.x, y: -offset.y}});
  const { conquerLine } = state;
  if (conquerLine) {
    draw_poly_line({ctx, points: conquerLine, offset});
  }
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("invalid context");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
