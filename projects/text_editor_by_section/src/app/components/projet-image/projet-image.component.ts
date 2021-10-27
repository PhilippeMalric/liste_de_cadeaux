import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
  Inject,
  ElementRef,
  ViewContainerRef
} from '@angular/core';
import { Item } from '../table/table.component';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap, take } from 'rxjs/operators';
import { GameService, Section } from '../../services/game.service';
import {
  NotificationService,
  selectIsAuthenticated
} from '../../core/core.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { Store, select } from '@ngrx/store';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/overlay-directives';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { UpvoteService } from '../../services/upvote.service';
import { AngularFireDatabase } from '@angular/fire/database';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  DialogData,
  DialogPropositionVote
} from '../upvote-button/upvote-button.component';
import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-projet-image',
  templateUrl: './projet-image.component.html',
  styleUrls: ['./projet-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjetImageComponent implements OnInit, OnDestroy {
  

  small: boolean;
  images: any[];
  image$: Observable<any>;
  scrollToTop() {
    let top = document.getElementById("top")
      if (top !== null) {
        
        top.scrollIntoView(true);
        
        top = null;
      }
  }
  scrollContainer: any;
  @ViewChild('grid') grid: MatGridList;
  @ViewChild('container') container : ElementRef;
  sections: Section[];
  section: Section;
  users: any;
  user: string = 'originale';
  item$: BehaviorSubject<Item>;
  cats = [];
  original: any;
  uid: string;
  displayName: string;
  isAuthenticated$: Observable<boolean>;
  data: unknown;
  userId: string;
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
  sub1: Subscription;
  userSubscription: Subscription;
  section_int: any = 0;
  nouveau_text: any;

  constructor(
    private _view: ElementRef,
    public dialog: MatDialog,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private db: AngularFireDatabase,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private gameService: GameService,
    private notificationService: NotificationService,
    private ref: ChangeDetectorRef,
    private afAuth: AngularFireAuth,
    private store: Store,
    private observableMedia: MediaObserver,
    private upvoteService: UpvoteService
  ) {
    this.section = new Section('', '', []);
    /*
      this.afAuth.authState.subscribe((data)=>{
        
          
        if(data && data.uid){
          console.log("afauth")
          this.displayName = data.displayName
          this.uid = data.uid
         
        }
        
        this.changeDetectorRef.markForCheck()
      })
      */
  }
  ngOnDestroy(): void {
    //this.sub1.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.gameService.user.subscribe((user: string) => {
      console.log('user***');
      console.log(user);
      this.displayName = user;
      document['user'] = user;
    });
    
    this.image$ = this.gameService.get_logos().pipe(
      map((data:any[])=>{
        console.log("Logos")
        console.log(data)
  
        let data2 = data.map((row)=>{
          console.log( row.gsx$url)
          return {
            "id" : row.id,
            "url" : row.url
          }
  
        })
  
        this.images = data2
  
       return this.images
      })
    )
    }



  updateColor = () => {
    Object.keys(this.sections).map(key => {
      this.sections[key].color = 'accent';
    });

    this.sections[this.section_int].color = 'primary';
  };

  clickNav = i => {
    
    this.section_int = i;
    this.section = this.sections[this.section_int];
    this.updateColor();
  };

  

  forward = () => {
    if (this.section_int != this.sections.length - 1) {
      console.log("foward")
      this.scrollToTop()
      
      this.section_int = this.section_int + 1;
      this.section = this.sections[this.section_int];
      this.updateColor();
    }
  };
  back = () => {
    if (this.section_int != 0) {
      console.log("back")
      this.scrollToTop()
      this.section_int = this.section_int - 1;
      this.section = this.sections[this.section_int];
      this.updateColor();
    }
  };

  ngAfterViewInit(){
    console.log("_view.element")
    console.log(this._view.nativeElement.offsetWidth)

  }

  ngAfterContentInit() {

    
    
  }
  remerciement = ()=>{

    this.router.navigate(['remerciement']);

  }

  is_dirty = (users: any) => {
    let new_items = {};

    Object.keys(users).map(key1 => {
      let user = Object.keys(users[key1]).map((key2: any) => {
        //let dirty = users[key1][key2].txt != this.original[key2].txt
        //users[key1][key2].dirty = dirty
        return users[key1][key2];
      });

      new_items[key1] = user;
    });

    return new_items;
  };
}


