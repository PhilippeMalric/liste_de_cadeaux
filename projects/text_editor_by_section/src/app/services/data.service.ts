import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { App_N_Game_State, selectGameMeta } from '../gameMeta.state';
import { tap, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Link, Node } from '../d3';

@Injectable()
export class DataService {
  nodes: Node[];
  links: Link[];

  subscription: any;

  dataS: any;
  myGames: any;
  is_name$: Observable<boolean>;

  constructor(
    private afs: AngularFirestore,
    public store: Store<App_N_Game_State>
  ) {}
}
