import { Action } from "./Action";

export type ActionDefinition = {
  type: string;
  handle: (state: any, action: any) => any;
  create: (...args: any[]) => Action;
};
