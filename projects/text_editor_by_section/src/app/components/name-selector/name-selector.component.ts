import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CadeauxService } from '../../services/cadeaux.service';

@Component({
  selector: 'anms-name-selector',
  templateUrl: './name-selector.component.html',
  styleUrls: ['./name-selector.component.scss']
})
export class NameSelectorComponent implements OnInit {
  nomFormControl = new FormControl('', [Validators.required]);

  noms: any;

  constructor(
    private storage: AngularFireStorage,
    private cadeauxService: CadeauxService
  ) {}

  ngOnInit(): void {}

  onSubmit = () => {
    this.cadeauxService.add_nom({ nom: this.nomFormControl.value });
  };
}
