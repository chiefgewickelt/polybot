import React from "react";
import { clickAction } from "src/action/clickAction";
import { mouseMoveAction } from "src/action/mouseMoveAction";
import "./Canvas.css";
import { clearCanvas, draw } from "./draw";
import { useViewportSize } from "src/hook/useViewportSize";
import { useStore } from "src/store/useStore";

export function Canvas() {
  const [state, dispatch] = useStore();

  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const viewportSize = useViewportSize();

  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    dispatch(mouseMoveAction.create(e));
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    dispatch(clickAction.create(e));
  };

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    draw(canvas, state);
    return () => clearCanvas(canvas);
  }, [ref, state]);

  return (
    <canvas
      id="canvas"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      width={viewportSize.width}
      height={viewportSize.height}
      ref={ref}
    ></canvas>
  );
}
