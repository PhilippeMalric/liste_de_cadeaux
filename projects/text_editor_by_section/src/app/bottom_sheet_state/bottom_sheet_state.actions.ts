import { Action } from '@ngrx/store';

export enum Bottom_sheetActionTypes {
  UPSERT = '[bottom_sheet] Upsert'
}

export class ActionBottom_sheetUpsert implements Action {
  readonly type = Bottom_sheetActionTypes.UPSERT;
  constructor(readonly payload: { value: Boolean }) {}
}

export type Bottom_sheetActions = ActionBottom_sheetUpsert;
