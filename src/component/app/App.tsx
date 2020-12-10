import React from "react";
import "./App.css";
import { Canvas } from "src/component/canvas/Canvas";
import { StoreProvider } from "src/store/StoreProvider";

export function App() {
  return (
    <StoreProvider>
      <Canvas />
    </StoreProvider>
  );
}
