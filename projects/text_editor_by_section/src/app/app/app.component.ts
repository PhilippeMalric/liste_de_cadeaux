import browser from 'browser-detect';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { environment as env } from '../../environments/environment';

import { myData } from '../data/data';

import {
  ActionAuthLogin,
  ActionAuthLogout,
  routeAnimations,
  LocalStorageService,
  selectIsAuthenticated,
  selectSettingsStickyHeader,
  selectSettingsLanguage,
  selectEffectiveTheme,
  selectRouterState,
  NotificationService
} from '../core/core.module';
import {
  actionSettingsChangeAnimationsPageDisabled,
  actionSettingsChangeLanguage
} from '../core/settings/settings.actions';
import { DataService } from '../services/data.service';

import { ActionAuthloginAttemp } from '../core/auth/auth.actions';
import {
  MatBottomSheetRef,
  MatBottomSheet
} from '@angular/material/bottom-sheet';

import { Router, NavigationEnd } from '@angular/router';
import { Link, Node, D3Service } from '../d3';

import { take, tap, timeout } from 'rxjs/operators';

import { ActionBottom_sheetUpsert } from '../bottom_sheet_state/bottom_sheet_state.actions';
import { selectIsBS_opened } from '../bottom_sheet_state/bottom_sheet_state.selectors';

import { GameService } from '../services/game.service';
import { isPlatformBrowser } from '@angular/common';
import { MatGridList } from '@angular/material/grid-list';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { start } from 'repl';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GoogleAuthService } from '../core/auth/google-auth.service';
// declare google analytics
declare const ga: any;

@Component({
  selector: 'anms-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations]
})
export class AppComponent implements OnInit {
  isProd = env.production;
  envName = env.envName;
  version = env.versions.app;
  year = new Date().getFullYear();
  logo = require('../../assets/mini.png');
  languages = ['fr'];
  navigation = [
    { link: 'mode_d_emploi', label: 'anms.menu.about' },
    { link: 'Projet_de_loi', label: 'anms.menu.game' }
  ];
  navigationSideMenu = [
    ...this.navigation,
    { link: 'settings', label: 'anms.menu.settings', enabled: true }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;
  theme$: Observable<string>;
  myGames: any;
  subscription: Subscription;
  the_key: string;
  is_named$: Observable<boolean>;
  is_bottom_sheet_opened: Observable<Boolean>;
  myturn$: Observable<Boolean>;
  displayName: string = '';
  subscription1: Subscription;
  isAuthenticated2: any;
  large = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public dialog: MatDialog,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store,
    private storageService: LocalStorageService,
    private dataS: DataService,
    public _bottomSheet: MatBottomSheet,
    private d3service: D3Service,
    public gameService: GameService,
    private notificationService: NotificationService,
    private googleAuthService: GoogleAuthService,
    private dataService: DataService
  ) {
    console.log('App constructor!!');

    this.subscription = null;

    this.store.pipe(select(selectRouterState)).subscribe(() => {
      this.store.dispatch(new ActionBottom_sheetUpsert({ value: false }));
      this._bottomSheet.dismiss();
    });
    this.is_bottom_sheet_opened = this.store.pipe(
      select(selectIsBS_opened),
      tap(data => {
        this.changeDetectorRef.markForCheck();
      })
    );
  }

  private static isIEorEdgeOrSafari() {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  ngOnInit(): void {
    /*
    setTimeout(()=>{
      if(this.displayName == ""){
        this.notificationService.success("Veuillez vous inscrire pour commencer.")
      }
     
    },40000)

    setTimeout(()=>{
      if(this.displayName == ""){
        this.notificationService.warn("Écrivez votre nom en haut, puis cliquez sur validez! (en haut à gauche pour les téléphones et tablettes)")
      }
     
    },60000)

    */
    setTimeout(() => {
      if (this.displayName == '') {
        this.notificationService.default('Veuillez vous identifier');
      }
    }, 3000);

    this.gameService.user.next(this.displayName);
    this.subscription1 = this.gameService.user.subscribe(user => {
      this.navigation = this.navigation.map(nav => {
        return { ...nav, enabled: nav.link == 'mode_d_emploi' || user != '' };
      });
      this.navigationSideMenu = [
        ...this.navigation,
        { link: 'settings', label: 'anms.menu.settings', enabled: true }
      ];

      this.isAuthenticated2 = user != '';
      console.log(this.isAuthenticated2);
      console.log('------------------------------------------------------');
      this.changeDetectorRef.markForCheck();
    });

    this.storageService.testLocalStorage();
    if (AppComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        actionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
    this.theme$ = this.store.pipe(select(selectEffectiveTheme));
  }

  ngOnDestroy = () => {
    this.subscription1.unsubscribe();
  };

  logOut2 = () => {
    this.gameService.user.next('');
    this.router.navigate(['mode_d_emploi']);
  };

  validez = () => {
    this.googleAuthService.signInLink(this.displayName);

    //this.router.navigate(['projet_de_loi']);
  };

  checkAuth() {
    this.googleAuthService.checkAuth(this.displayName);
  }

  ngAfterViewInit(): void {
    this.router.events.subscribe(event => {
      // I check for isPlatformBrowser here because I'm using Angular Universal, you may not need it
    });
  }
  onLoginClick() {
    this.store.dispatch(new ActionAuthloginAttemp());
  }

  onLogoutClick() {
    this.gameService.user.next('');
    this.gameService.userEmail.next('');
    this.store.dispatch(new ActionAuthLogout());
  }

  onLanguageSelect({ value: language }) {
    this.store.dispatch(actionSettingsChangeLanguage({ language }));
  }

  openBottomSheet(): void {
    this.store.dispatch(new ActionBottom_sheetUpsert({ value: true }));
    this._bottomSheet.open(BottomSheetComponent);
  }

  closeBottomSheet(): void {
    this.store.dispatch(new ActionBottom_sheetUpsert({ value: false }));
    this._bottomSheet.dismiss();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogInfo, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog info was closed');
    });
  }
}

@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html'
})
export class BottomSheetComponent {
  the_name: string;
  the_key: string;
  the_key_join: string;
  the_id: any;
  desc: any;
  is_named$: Observable<Boolean>;

  constructor(
    private router: Router,
    private store: Store,
    private changeDetectorRef: ChangeDetectorRef,
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private dataS: DataService
  ) {}

  close(): void {
    this.store.dispatch(new ActionBottom_sheetUpsert({ value: false }));
    this._bottomSheetRef.dismiss();
  }

  /*
  nameChange = ()=>{
    this.store.dispatch(new ActionNameUpsert({name:String(this.the_name)}))
    this.router.navigate(["feature-list"])
    this.changeDetectorRef.markForCheck()
  }
  */
}

@Component({
  selector: 'dialog_commentaire',
  templateUrl: './dialog.html',
  styleUrls: ['./app.component.scss']
})
export class DialogInfo {
  constructor(public dialogRef: MatDialogRef<DialogInfo>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
