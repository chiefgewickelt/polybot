import React from "react";
import { resetAction } from "src/action/resetAction";
import { useStore } from "src/store/useStore";
import "./Ui.css";

export function Ui() {
  const playerName = "Player";

  const [state, dispatch] = useStore();

  const handleReset = React.useCallback(() => {
    dispatch(resetAction.create({ playerName }));
  }, [playerName]);

  return (
    <button onClick={handleReset} className="reset-button">
      reset
    </button>
  );
}
