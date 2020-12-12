import { Collision } from "src/type/Collision";
import { Point } from "src/type/Point";
import { State } from "src/type/State";

function draw_poly_line(ctx: CanvasRenderingContext2D, points: Point[]) {
  const tail = [...points];
  const head = tail.shift();
  if (!head) {
    throw new Error("zero points given");
  }
  // ctx.beginPath();
  ctx.moveTo(head.x, head.y);
  tail.forEach(({ x, y }) => ctx.lineTo(x, y));
  // ctx.closePath();
  ctx.stroke();
}

function draw_player(ctx: CanvasRenderingContext2D, { x, y }: Point) {
  ctx.fillRect(x - 7, y - 7, 14, 14);
}

function draw_collisions(
  ctx: CanvasRenderingContext2D,
  collisions: Collision[]
) {
  const radius = 10;
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  collisions.forEach(({ collisionPoint: { x, y } }) => {
    ctx.moveTo(x + radius, y);
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
  });
  ctx.fill();
}

function draw_polygon(
  ctx: CanvasRenderingContext2D,
  points: Point[],
  fillcolor: string = "#11cc00"
) {
  ctx.fillStyle = fillcolor;
  ctx.beginPath();
  points.forEach(({ x, y }) => {
    ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fill();
}

function draw_mouse(ctx: CanvasRenderingContext2D, { x, y }: Point) {
  const radius = 4;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arc(x, y, 10, 0, 2 * Math.PI);
  ctx.fill();
}

export function draw(canvas: HTMLCanvasElement, state: State) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("invalid context");
  }
  draw_polygon(ctx, state.home);
  draw_collisions(ctx, state.collisions);
  draw_player(ctx, state.selfPos);
  draw_mouse(ctx, state.mousePos);
  const { conquerLine } = state;
  if (conquerLine) {
    draw_poly_line(ctx, conquerLine);
  }
}

export function clearCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("invalid context");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
