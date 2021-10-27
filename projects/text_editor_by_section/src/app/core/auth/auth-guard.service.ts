import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectIsAuthenticated } from './auth.selectors';
import { AppState } from '../core.state';
import { GameService } from '../../services/game.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(selectIsAuthenticated));
  }
}

@Injectable({
  providedIn: 'root'
})
export class NameGuardService implements CanActivate {
  constructor(private gameService: GameService) {}

  canActivate(): Observable<boolean> {
    return this.gameService.user.pipe(
      map(name => {
        return name != '';
      })
    );
  }
}
