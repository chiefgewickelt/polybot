import { resetAction, ResetArgs } from "./resetAction";

export function makeInitialState(args: ResetArgs) {
  return resetAction.handle(undefined, resetAction.create(args));
}
