import { Dispatch } from "react";
import { Action } from "src/type/Action";
import { State } from "src/type/State";

export type Store = [State, Dispatch<Action>];
