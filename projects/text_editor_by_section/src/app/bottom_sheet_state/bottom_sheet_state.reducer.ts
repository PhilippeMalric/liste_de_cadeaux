import {
  Bottom_sheetActions,
  Bottom_sheetActionTypes
} from './bottom_sheet_state.actions';

export const initialState: Boolean = true;

export function bottom_sheetReducer(
  state: Boolean = initialState,
  action: Bottom_sheetActions
): Boolean {
  switch (action.type) {
    case Bottom_sheetActionTypes.UPSERT:
      return action.payload.value;
    default:
      return state;
  }
}
