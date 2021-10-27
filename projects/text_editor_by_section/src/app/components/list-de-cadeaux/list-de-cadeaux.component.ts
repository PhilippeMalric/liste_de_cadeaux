import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { map } from 'rxjs/operators';
import { Cadeau, CadeauxService } from '../../services/cadeaux.service';

@Component({
  selector: 'anms-list-de-cadeaux',
  templateUrl: './list-de-cadeaux.component.html',
  styleUrls: ['./list-de-cadeaux.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListDeCadeauxComponent implements OnInit {
  cadeaux$: any;

  constructor(private cadeauxService: CadeauxService) {}

  ngOnInit(): void {
    this.cadeaux$ = this.cadeauxService.get_cadeaux().pipe(
      map((data: any) => {
        console.log(data);
        return Object.keys(data).map(key => {
          return data[key];
        });
      }),
      map((data: any[]) => {
        return data.filter((cadeau: any) => {
          return cadeau != 0;
        });
      })
    );
  }
}
