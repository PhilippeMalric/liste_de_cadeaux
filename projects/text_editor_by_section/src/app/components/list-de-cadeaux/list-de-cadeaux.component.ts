import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { map, take } from 'rxjs/operators';
import { Cadeau, CadeauxService } from '../../services/cadeaux.service';

@Component({
  selector: 'anms-list-de-cadeaux',
  templateUrl: './list-de-cadeaux.component.html',
  styleUrls: ['./list-de-cadeaux.component.scss']
})
export class ListDeCadeauxComponent implements OnInit {
  cadeaux$: any;
  @ViewChild('grid') grid: MatGridList;
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 2,
    sm: 1,
    xs: 1
  };

  gridByBreakpointH = {
    xl: 850,
    lg: 600,
    md: 500,
    sm: 500,
    xs: 600
  };
  small: boolean;
  cadeaux: any[];

  constructor(
    private cadeauxService: CadeauxService,
    private observableMedia: MediaObserver
  ) {}

  ngOnInit(): void {
    this.cadeauxService.nomSelected$.subscribe(data => {
      this.getCadeau();
    });

    this.getCadeau();
  }

  getCadeau = () => {
    this.cadeaux$ = this.cadeauxService
      .get_cadeaux()
      .pipe(
        take(1),
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
      )
      .subscribe(data => {
        console.log('cadeaux', data);
        this.cadeaux = data;
      });
  };

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log('change');
      console.log(change);
      console.log(this.gridByBreakpoint[change[0].mqAlias]);
      if (this.grid) {
        this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
      }

      console.log(change[0].mqAlias);
      if (change[0].mqAlias == 'sm' || change[0].mqAlias == 'xs') {
        this.small = true;
      } else {
        this.small = false;
      }
      console.log('cols');
      //console.log(this.grid.cols)
      //this.grid.rowHeight = this.gridByBreakpointH[change[0].mqAlias];
      //this.ref.markForCheck();
    });
  }
}
