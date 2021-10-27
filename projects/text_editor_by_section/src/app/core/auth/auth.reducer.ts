import { AuthState } from './auth.models';
import { AuthActions, AuthActionTypes } from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: AuthState = {
  isAuthenticated: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: true };

    case AuthActionTypes.LOGOUT:
      return { ...state, isAuthenticated: false };

    default:
      return state;
  }
}
