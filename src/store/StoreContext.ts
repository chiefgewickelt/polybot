import React from "react";
import { makeInitialState } from "src/action/makeInitialState";
import { Store } from "../type/Store";

export const StoreContext = React.createContext<Store>([
  makeInitialState(),
  () => {
    throw new Error("dispatching to uninitialized store");
  },
]);
