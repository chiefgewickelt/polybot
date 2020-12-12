import React from "react";
import { StoreContext } from "./StoreContext";

export function useStore() {
  return React.useContext(StoreContext);
}
