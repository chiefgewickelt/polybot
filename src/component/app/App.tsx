import React, { ReactNode } from "react";
import { mouseMoveAction } from "src/action/mouseMoveAction";
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

export function App() {
  return (
    <StoreProvider>
      <MouseWatcher>
        <Canvas />
        <Ui />
      </MouseWatcher>
    </StoreProvider>
  );
}
