import { Action } from "src/type/Action";
import { ActionDefinition } from "src/type/ActionDefinition";
import { State } from "src/type/State";

export function makeActionReducer(actions: ActionDefinition[]) {
  return (state: State, action: Action) => {
    const currAction = Object.values(actions).filter(
      (a) => a.type === action.type
    );
    if (currAction.length !== 1) {
      throw new Error(`unknown or ambiguous action ${action.type}`);
    }
    return currAction[0].handle(state, action);
  };
}
