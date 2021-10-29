import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject } from 'rxjs';

export class Cadeau {
  nom: any;
  url: any;
  user: any;

  constructor(user, nom, url) {
    this.user = user;
    this.nom = nom;
    this.url = url;
  }
}

//-----------------------------------------------------------------------------------

@Injectable({
  providedIn: 'root'
})
export class CadeauxService {
  nomSelected = '';
  nomSelected$: BehaviorSubject<string>;
  constructor(private db: AngularFireDatabase) {
    this.nomSelected$ = new BehaviorSubject<string>('');
    this.nomSelected$.subscribe(data => {
      this.nomSelected = data;
    });
  }

  get_cadeaux = () => {
    return this.db.object(`cadeaux/`).valueChanges();
  };

  add_cadeau = (cadeau: Cadeau) => {
    this.db.object(`cadeaux/${cadeau.nom}/`).update(cadeau);
  };

  get_noms = () => {
    return this.db.object(`noms/`).valueChanges();
  };

  add_nom = nom => {
    this.db.object(`noms/${nom.nom}/`).update(nom);
  };
}
