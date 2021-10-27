import {
  Component,
  Input,
  ChangeDetectorRef,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  AfterViewInit
} from '@angular/core';
import { D3Service, ForceDirectedGraph, Node, Link } from '../../d3';

import { DataService } from '../../services/data.service';
import {
  ROUTE_ANIMATIONS_ELEMENTS,
  NotificationService
} from '../../core/core.module';

import { take, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  public _options: { width; height } = { width: 400, height: 400 };
  players: any[];
  im_left$: any;
  game_started = false;
  endGame$: any;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    //this.d3Service.sg.initSimulation(this.options);
  }

  constructor(
    public d3Service: D3Service,
    private ref: ChangeDetectorRef,
    private dataS: DataService,
    private store: Store,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  my_click() {
    this.ref.markForCheck();
  }

  save(i: any) {}

  wasteTurn() {}

  start_game = () => {};

  reset() {}

  next_turn() {}

  test = () => {};

  gen_graph = () => {};

  get options() {
    let wi = 0;
    let hi = 0;
    if (window.innerWidth < 600) {
      wi = window.innerWidth - 20;
    } else {
      wi = window.innerWidth - 200;
    }

    return (this._options = {
      width: wi,
      height: window.innerHeight - 400
    });
  }
}
