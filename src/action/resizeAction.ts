import { Dim, State } from "src/type/State";

type ResizeAction = {
  type: string;
  dim: Dim;
};

const type = "RESIZE";

export type ResizeArgs = { dim: Dim };
function create({ dim }: ResizeArgs): ResizeAction {
  return {
    type,
    dim,
  };
}

function handle(state: State, action: ResizeAction): State {
  const { dim } = action;

  return {
    ...state,
    dim,
  };
}

export const resizeAction = {
  type,
  create,
  handle,
};
