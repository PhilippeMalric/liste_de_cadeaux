import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { CadeauxService } from '../../services/cadeaux.service';

@Component({
  selector: 'anms-user-selection',
  templateUrl: './user-selection.component.html',
  styleUrls: ['./user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {
  noms: any;

  constructor(private cadeauxService: CadeauxService) {}

  ngOnInit(): void {
    this.cadeauxService
      .get_noms()
      .pipe(
        map((data: any) => {
          console.log(data);
          return Object.keys(data).map(key => {
            return data[key];
          });
        }),
        map((data: any[]) => {
          console.log(data);
          let r = [];
          if (data.length > 0) {
            r = data.filter((nom: any) => {
              return nom != 0;
            });
          }
          return r;
        }),
        map((data: any[]) => {
          let r = [];
          if (data.length > 0) {
            r = data.map((nom: any) => {
              return {
                selected: nom.nom == this.cadeauxService.nomSelected,
                ...nom
              };
            });
          }
          return r;
        })
      )
      .subscribe(data => {
        this.noms = data;
      });
  }

  selection_nom = nom => {
    console.log(nom);
    this.cadeauxService.nomSelected = nom;
    this.cadeauxService.nomSelected$.next(nom);
    this.noms = this.noms.map((nom: any) => {
      return { ...nom, selected: nom.nom == this.cadeauxService.nomSelected };
    });

    console.log(this.noms, this.cadeauxService.nomSelected);
  };
}
