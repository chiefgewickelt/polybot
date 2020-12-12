import React from "react";
import { resetAction } from "src/action/resetAction";
import { useStore } from "src/store/useStore";
import "./Ui.css";

export function Ui() {
  const playerName = "Player";

  const [, dispatch] = useStore();

  const handleReset = React.useCallback(() => {
    dispatch(resetAction.create({ playerName }));
  }, [dispatch, playerName]);

  return (
    <button onClick={handleReset} className="reset-button">
      reset
    </button>
  );
}
