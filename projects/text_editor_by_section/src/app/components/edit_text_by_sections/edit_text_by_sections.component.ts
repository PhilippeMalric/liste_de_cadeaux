import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  HostListener
} from '@angular/core';
import { Item } from '../table/table.component';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameService } from '../../services/game.service';
import { take, map, tap } from 'rxjs/operators';
import { NotificationService } from '../../core/core.module';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { AngularFireAuth } from '@angular/fire/auth';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'anms-edit-text-by-sections',
  templateUrl: './edit_text_by_sections.component.html',
  styleUrls: ['./edit_text_by_sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Edit_text_by_sectionsComponent implements OnInit {
  @ViewChild('grid') grid: MatGridList;
  @ViewChild('grid_cat') grid_cat: MatGridList;
  itemSubscription: Subscription;
  userSubscription: Subscription;
  startedSubscription: Subscription;
  displayName: string;

  cat = 'items';
  items: any;
  item$: BehaviorSubject<Item>;

  item_i = 0;
  cats = [];
  my_item_db: Item[];

  started: boolean = false;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 3,
    sm: 2,
    xs: 1
  };

  gridByBreakpointH = {
    xl: 850,
    lg: 600,
    md: 500,
    sm: 500,
    xs: 600
  };

  subscription_db: Subscription;

  uid: string;

  items_db: Item[];
  items_db_length: BehaviorSubject<Number>;
  subscription: Subscription;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private gameService: GameService,
    private notificationService: NotificationService,
    private observableMedia: MediaObserver,
    private ref: ChangeDetectorRef,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.itemSubscription = this.gameService.items.subscribe(
      (items: Item[]) => {
        console.log('items***');
        console.log(items);
        this.items = items;
        document['my_var2'] = this.items;
      }
    );
    this.userSubscription = this.gameService.user.subscribe((user: string) => {
      console.log('user***');
      console.log(user);
      this.displayName = user;
      document['user'] = user;
    });
    this.startedSubscription = this.gameService.started.subscribe(
      (started: boolean) => {
        console.log('started***');
        console.log(started);
        this.started = started;
        document['started'] = started;
      }
    );
    //this.start()
  }

  ngOnDestroy = () => {
    this.itemSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
    this.startedSubscription.unsubscribe();
  };

  start = () => {
    console.log(this.items);
    this.gameService.user.next(this.displayName);

    this.gameService
      .get_items_user_create_if_not(this.displayName)
      .subscribe((items: any) => {
        this.gameService.items.next(items);
        if (items) {
          this.gameService.started.next(true);
        } else {
          this.gameService.started.next(false);
        }

        this.changeDetectorRef.markForCheck();
      });
  };

  update = () => {
    console.log('displayName');
    console.log(this.displayName);
    this.gameService.update(this.displayName, this.items);
  };

  ngAfterContentInit() {}

  onPanLeft = () => {
    console.log('panLeft');
    this.notificationService.info('left');
  };

  onPanRight = () => {
    console.log('onPanRight');
    this.notificationService.info('rigth');
  };



  probe = () => {
    console.log(this.items_db);
  };

  skip = () => {
    this.update();
  };



  delete = item => {
    this.gameService.remove_by_user(item, this.uid);
  };

  probe_db = () => {
    this.gameService.probe_db();
  };

  avance = () => {};

  recule = () => {
    let items = this.items_db;

    this.item$.next(items[this.item_i]);
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
