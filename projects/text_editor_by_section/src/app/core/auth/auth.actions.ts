import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_TRY = '[Auth] Login try',
  LOGOUT = '[Auth] Logout'
}

export class ActionAuthLogin implements Action {
  readonly type = AuthActionTypes.LOGIN;
}

export class ActionAuthLogout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class ActionAuthloginAttemp implements Action {
  readonly type = AuthActionTypes.LOGIN_TRY;
}

export type AuthActions = ActionAuthLogin | ActionAuthLogout;
