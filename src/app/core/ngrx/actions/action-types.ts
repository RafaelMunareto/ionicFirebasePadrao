/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Action } from '@ngrx/store';

export enum ActionTypes {
  AddResponsavel = 'addResponsavel',
  RemoveResponsavel = 'remResponsavel',
  ClearResponsavel = 'clearResponsavel'
}

//responsavel

export const AddResponsavel = (responsavel: any) => {
  return <Action>{ type: ActionTypes.AddResponsavel, payload: responsavel };
};

export const RemoveResponsavel = (responsavel: any) => {
  return <Action>{ type: ActionTypes.RemoveResponsavel, payload: responsavel };
};

export const ClearResponsavel = () => {
  return <Action>{ type: ActionTypes.ClearResponsavel, payload: null };
};

