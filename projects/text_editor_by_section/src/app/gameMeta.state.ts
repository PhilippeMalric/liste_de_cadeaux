import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { AppState } from './core/core.module';
import { bottom_sheetReducer } from './bottom_sheet_state/bottom_sheet_state.reducer';

export const FEATURE_NAME = 'GameMeta';
export const selectGameMeta = createFeatureSelector<
  App_N_Game_State,
  GameMetaState
>(FEATURE_NAME);
export const reducers: ActionReducerMap<GameMetaState> = {
  bottom_sheet_state: bottom_sheetReducer
};

export interface GameMetaState {
  bottom_sheet_state;
}

export interface App_N_Game_State extends AppState {
  GameMeta: GameMetaState;
}
