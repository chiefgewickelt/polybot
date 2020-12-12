import React, { ReactNode } from "react";
import { makeInitialState } from "src/action/makeInitialState";
import { mouseMoveAction } from "src/action/mouseMoveAction";
import { tickAction } from "src/action/tickAction";
import { makeActionReducer } from "./makeActionReducer";
import { StoreContext } from "./StoreContext";

export const reducer = makeActionReducer([
  mouseMoveAction,
  tickAction,
]);

type StoreProviderProps = { children: ReactNode };
export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = React.useReducer(
    reducer,
    undefined,
    makeInitialState
  );

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {children}
    </StoreContext.Provider>
  );
}
