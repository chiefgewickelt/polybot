import React, { ReactNode } from "react";
import { clickAction } from "src/action/clickAction";
import { makeInitialState } from "src/action/makeInitialState";
import { mouseMoveAction } from "src/action/mouseMoveAction";
import { makeActionReducer } from "./makeActionReducer";
import { StoreContext } from "./StoreContext";

export const reducer = makeActionReducer([clickAction, mouseMoveAction]);

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
