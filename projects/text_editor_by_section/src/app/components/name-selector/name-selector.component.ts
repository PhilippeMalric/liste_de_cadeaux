import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CadeauxService } from '../../services/cadeaux.service';
import { MyErrorStateMatcher } from '../email/email.component';

@Component({
  selector: 'anms-name-selector',
  templateUrl: './name-selector.component.html',
  styleUrls: ['./name-selector.component.scss']
})
export class NameSelectorComponent implements OnInit {
  nomFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  noms: any;

  constructor(
    private storage: AngularFireStorage,
    private cadeauxService: CadeauxService
  ) {}

  ngOnInit(): void {
    this.cadeauxService
      .get_noms()
      .pipe(
        map((data: any) => {
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

    this.noms = this.noms.map((nom: any) => {
      return { ...nom, selected: nom.nom == this.cadeauxService.nomSelected };
    });

    console.log(this.noms, this.cadeauxService.nomSelected);
  };

  onSubmit = () => {
    this.cadeauxService.add_nom({ nom: this.nomFormControl.value });
  };
}
