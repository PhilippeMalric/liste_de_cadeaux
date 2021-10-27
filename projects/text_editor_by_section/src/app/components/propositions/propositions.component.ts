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
  selector: 'anms-propositions',
  templateUrl: './propositions.component.html',
  styleUrls: ['./propositions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropositionsComponent implements OnInit, OnDestroy {
  

  small: boolean;
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
    this.sub1.unsubscribe();
  }

  ngOnInit(): void {
    
    
    this.sections = [];

    this.userSubscription = this.gameService.user.subscribe((user: string) => {
      console.log('user***');
      console.log(user);
      this.displayName = user;
      document['user'] = user;
    });

    this.item$ = new BehaviorSubject<Item>(null);
    this.sections = [];
    this.sub1 = this.gameService.get_user_data().subscribe(items => {
      console.log('user');
      console.log(items);
      if (items) {
        this.data = this.is_dirty(items);
        this.users = Object.keys(items);

        console.log('data');
        console.log(this.data);

        this.changeDetectorRef.markForCheck();
      }
    });

    this.section_int = 0;
    this.gameService.get_projet_de_loi3().subscribe((sections: any) => {
      console.log('sections...');
      console.log(sections);
      this.sections = sections;
      this.section = this.sections[this.section_int];
      this.original = sections;

      Object.keys(sections).map(key => {
        sections[key].color = 'accent';

        this.gameService.voir_props(sections[key].id,this.displayName).subscribe((data:any)=>{
          if(data){sections[key].commentaire = data.prop}
        })
        

      });
      this.sections = sections;

      this.sections[0].color = 'primary';

      console.log('original');
      console.log(this.original);
      this.changeDetectorRef.markForCheck()
    });
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
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

  openDialog(): void {
    
    const dialogRef = this.dialog.open(DialogCommentaireSection, {
      width: '400px',
      data: { nouveau_text: this.section.commentaire, text: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.nouveau_text = result;
      console.log('result');
      console.log(result);
      console.log(this.section.id);
      if (result && result != '') {
        let data = {};
        data[this.displayName] = { delete: false,approuve: false, prop: result };
        this.db.object(`propositions/${this.section.id}/`).update(data);
      }
    });
  }

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

    
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      console.log('change');
      console.log(change);
      
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias]
      console.log(change[0].mqAlias)
      if(change[0].mqAlias == "sm" || change[0].mqAlias == "xs"){
         this.small = true
      }else{
        this.small = false
      }
      console.log('cols');
      //console.log(this.grid.cols)
      //this.grid.rowHeight = this.gridByBreakpointH[change[0].mqAlias];
      this.ref.markForCheck();
    });
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

@Component({
  selector: 'dialog_commentaire',
  templateUrl: './dialog.html',
  styleUrls: ['./propositions.component.scss']
})
export class DialogCommentaireSection {
  constructor(
    public dialogRef: MatDialogRef<DialogPropositionVote>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
