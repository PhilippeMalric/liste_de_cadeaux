import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

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

  constructor(private db: AngularFireDatabase) {}

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
