import React from "react";

function getViewportSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function useViewportSize() {
  const currSize = getViewportSize();

  const [size, setSize] = React.useState(currSize);

  const updateSize = React.useCallback(() => {
    setSize({ width: currSize.width, height: currSize.height });
  }, [setSize, currSize.width, currSize.height]);

  React.useEffect(updateSize, [updateSize]);

  return size;
}
