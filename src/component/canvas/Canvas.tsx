import React from "react";
import { tickAction } from "src/action/tickAction";
import { useViewportSize } from "src/hook/useViewportSize";
import { useStore } from "src/store/useStore";
import "./Canvas.css";
import { clearCanvas, draw } from "./draw";

function useInterval(f: () => void, ms: number) {
  React.useEffect(() => {
    const id = window.setInterval(f, ms);
    return () => window.clearInterval(id);
  }, [f, ms]);
}

export function Canvas() {
  const [state, dispatch] = useStore();

  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const viewportSize = useViewportSize();

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    draw(canvas, state);
    return () => clearCanvas(canvas);
  }, [ref, state]);

  const dispatchTick = React.useCallback(() => dispatch(tickAction.create()), [
    dispatch,
  ]);
  useInterval(dispatchTick, 20);

  return (
    <canvas
      id="canvas"
      width={viewportSize.width}
      height={viewportSize.height}
      ref={ref}
    ></canvas>
  );
}
