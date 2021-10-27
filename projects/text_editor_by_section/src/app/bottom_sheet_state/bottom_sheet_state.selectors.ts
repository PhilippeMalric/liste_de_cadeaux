import { selectGameMeta, GameMetaState } from '../gameMeta.state';
import { createSelector } from '@ngrx/store';

export const selectIsBS_opened = createSelector(
  selectGameMeta,
  (state: GameMetaState) => state.bottom_sheet_state
);
