import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ofType, createEffect, Actions } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../local-storage/local-storage.service';

import {
  ActionAuthLogin,
  AuthActionTypes,
  ActionAuthLogout
} from './auth.actions';
import { GoogleAuthService } from './google-auth.service';

export const AUTH_KEY = 'AUTH';

@Injectable()
export class AuthEffects {
  constructor(
    private googleAuth: GoogleAuthService,
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  logout = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ActionAuthLogout>(AuthActionTypes.LOGOUT),
        tap(() => {
          this.router.navigate(['']);
          this.googleAuth.logout();
          this.localStorageService.setItem(AUTH_KEY, {
            isAuthenticated: false
          });
        })
      ),
    { dispatch: false }
  );

  loginTry = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ActionAuthLogin>(AuthActionTypes.LOGIN_TRY),
        tap(() => {
          this.googleAuth.googleSignIn();
        })
      ),
    { dispatch: false }
  );

  login = createEffect(
    () =>
      this.actions$.pipe(
        ofType<ActionAuthLogin>(AuthActionTypes.LOGIN),
        tap(() => {
          this.router.navigate(['Upload_file']);
        })
      ),
    { dispatch: false }
  );
}
//
