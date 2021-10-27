import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-gestion-donnees',
  templateUrl: './gestion-donnees.component.html',
  styleUrls: ['./gestion-donnees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GestionDonneesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
