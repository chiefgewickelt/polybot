import React, { ReactNode } from "react";
import { makeInitialState } from "src/action/makeInitialState";
import { mouseMoveAction } from "src/action/mouseMoveAction";
import { resetAction } from "src/action/resetAction";
import { resizeAction } from "src/action/resizeAction";
import { tickAction } from "src/action/tickAction";
import { makeActionReducer } from "./makeActionReducer";
import { StoreContext } from "./StoreContext";

export const reducer = makeActionReducer([
  mouseMoveAction,
  resetAction,
  resizeAction,
  tickAction,
]);

type StoreProviderProps = { children: ReactNode };
export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = React.useReducer(
    reducer,
    { playerName: "Player" },
    makeInitialState
  );

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}
