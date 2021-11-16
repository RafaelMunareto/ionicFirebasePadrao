/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { ActionTypes } from '../actions/action-types';
import { ActionModel } from '../models/action.model';

export const objeto = {};

export function exampleReducer(state = objeto, action: ActionModel) {
  switch (action.type) {
    case ActionTypes.Add: {
      return { ...state, add: action.payload };
    }
    case ActionTypes.Remove: {
      return { ...state, remove: action.payload };
    }
    case ActionTypes.Clear: {
      state = objeto;
      return state;
    }
    default:
      return state;
  }
}
