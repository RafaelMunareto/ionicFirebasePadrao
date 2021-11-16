/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Action } from '@ngrx/store';

export enum ActionTypes {
  Add = 'add',
  Clear = 'clear',
  Remove = 'remove',
}

export const Add = (dado: any) => {
  return <Action>{ type: ActionTypes.Add, payload: dado };
};

export const Remove = (dado: any) => {
  return <Action>{ type: ActionTypes.Remove, payload: dado };
};

export const Clear = () => {
  return <Action>{ type: ActionTypes.Clear, payload: null };
};
