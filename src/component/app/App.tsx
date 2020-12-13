import React, { ReactNode } from "react";
import { mouseMoveAction } from "src/action/mouseMoveAction";
import { resizeAction } from "src/action/resizeAction";
import { Canvas } from "src/component/canvas/Canvas";
import { StoreProvider } from "src/store/StoreProvider";
import { useStore } from "src/store/useStore";
import { Ui } from "../ui/Ui";
import "./App.css";

type MouseWatcherProps = { children: ReactNode };
function MouseWatcher({ children }: MouseWatcherProps) {
  const handleMouseMove = (
    e: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    dispatch(mouseMoveAction.create(e));
  };

  const [, dispatch] = useStore();

  return <main onMouseMove={handleMouseMove}>{children}</main>;
}

type ResizeWatcherProps = { children: ReactNode };
function ResizeWatcher({ children }: ResizeWatcherProps) {
  const [state, dispatch] = useStore();

  const ref = React.useRef<HTMLCanvasElement | null>(null);

  const handleResize = React.useCallback(() => {
    // TODO: remove unfair advantage for players with huge resolution :-)
    const dim = { width: window.innerWidth, height: window.innerHeight };
    dispatch(resizeAction.create({ dim }));
  }, [dispatch]);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <>{children}</>;
}

export function App() {
  return (
    <StoreProvider>
      <ResizeWatcher>
        <MouseWatcher>
          <Canvas />
          <Ui />
        </MouseWatcher>
      </ResizeWatcher>
    </StoreProvider>
  );
}
