import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

/*
@Injectable()
export class GameEffects {
  constructor(private actions$: Actions<Action> ) {}

  @Effect({ dispatch: false })
  persistParticipant = this.actions$.pipe(
    ofType(NameActionTypes.UPSERT))
}
*/
