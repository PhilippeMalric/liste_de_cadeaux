import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { CoreModule, HttpLoaderFactory } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';
import {
  AppComponent,
  BottomSheetComponent,
  DialogInfo
} from './app/app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataService } from './services/data.service';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FEATURE_NAME, reducers } from './gameMeta.state';
import { HttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatDialogModule } from '@angular/material/dialog';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
);

import { RtlSupportDirective } from './shared/rtl-support/rtl-support.directive';
import { GoogleAuthService } from './core/auth/google-auth.service';
import { SettingsContainerComponent } from './components/settings/settings/settings-container.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import {
  MatBottomSheetModule,
  MAT_BOTTOM_SHEET_DEFAULT_OPTIONS
} from '@angular/material/bottom-sheet';

import { GameService } from './services/game.service';
import { D3_DIRECTIVES, D3Service } from './d3';
import { SHARED_VISUALS } from './visuals/shared';
import { GraphComponent } from './visuals/graph/graph.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MyTable } from './components/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import {
  AdminComponent,
  DialogPropositionAdmin,
  DialogVotersAdmin
} from './components/admin/admin.component';
import {
  DialogCommentaireSection,
  PropositionsComponent
} from './components/propositions/propositions.component';

import {
  HammerGestureConfig,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { HammerModule } from '@angular/platform-browser';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ExpressionComponent } from './components/expression/expression.component';
import { VersionOriginaleComponent } from './components/version_originale/version_originale.component';
import { Edit_text_by_sectionsComponent } from './components/edit_text_by_sections/edit_text_by_sections.component';
import {
  DialogPropositionVote,
  UpvoteButtonComponent
} from './components/upvote-button/upvote-button.component';
import { UpvoteService } from './services/upvote.service';
import { MatBadgeModule } from '@angular/material/badge';
import { EmailComponent } from './components/email/email.component';
import { ExplicationsComponent } from './components/explications/explications.component';
import { RemerciementComponent } from './components/remerciement/remerciement.component';
import { PropositionNavComponent } from './components/proposition-nav/proposition-nav.component';
import { GestionDonneesComponent } from './components/gestion-donnees/gestion-donnees.component';
import { GraphVoteComponent } from './components/graph-vote/graph-vote.component';
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { MessageInterPhaseComponent } from './components/message-inter-phase/message-inter-phase.component';
import { FromLinkComponent } from './components/from-link/from-link.component';
import { EnregistrementComponent } from './components/enregistrement/enregistrement.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { ResetMotDePasseComponent } from './components/reset-mot-de-passe/reset-mot-de-passe.component';
import { GoogleSheetComponent } from './components/google-sheet/google-sheet.component';
import { ProjetImageComponent } from './components/projet-image/projet-image.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ListDeCadeauxComponent } from './components/list-de-cadeaux/list-de-cadeaux.component';
import { NameSelectorComponent } from './components/name-selector/name-selector.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MaListeDeCadeauComponent } from './components/ma-liste-de-cadeau/ma-liste-de-cadeau.component';
import { UserSelectionComponent } from './components/user-selection/user-selection.component';
import { AssociateEmailComponent } from './components/associate-email/associate-email.component';

export class MyHammerConfig extends HammerGestureConfig {}

@NgModule({
  imports: [
    MatProgressBarModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatBadgeModule,
    DragDropModule,
    HammerModule,
    HttpClientModule,
    FlexLayoutModule,
    MatGridListModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    MatBottomSheetModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    MatPaginatorModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    FontAwesomeModule,
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core
    CoreModule,

    // app
    AppRoutingModule,
    NgxGoogleAnalyticsModule.forRoot('UA-148112928-2'),
    EffectsModule.forFeature([]),
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    })
  ],
  declarations: [
    ProjetImageComponent,
    MyTable,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    AppComponent,
    RtlSupportDirective,

    SettingsContainerComponent,
    BottomSheetComponent,

    AdminComponent,
    PropositionsComponent,
    VersionOriginaleComponent,
    Edit_text_by_sectionsComponent,

    ExpressionComponent,

    UpvoteButtonComponent,
    DialogPropositionVote,
    DialogCommentaireSection,
    DialogInfo,
    DialogVotersAdmin,
    DialogPropositionAdmin,
    EmailComponent,
    ExplicationsComponent,
    RemerciementComponent,
    PropositionNavComponent,
    GestionDonneesComponent,
    GraphVoteComponent,
    MessageInterPhaseComponent,
    FromLinkComponent,
    EnregistrementComponent,
    AuthentificationComponent,
    ResetMotDePasseComponent,
    GoogleSheetComponent,
    UploadFileComponent,
    ListDeCadeauxComponent,
    NameSelectorComponent,
    MaListeDeCadeauComponent,
    UserSelectionComponent,
    AssociateEmailComponent
  ],
  entryComponents: [
    EmailComponent,
    DialogPropositionAdmin,
    DialogVotersAdmin,
    DialogCommentaireSection,
    DialogPropositionVote,
    DialogInfo
  ],
  providers: [
    UpvoteService,
    GameService,
    DataService,
    GoogleAuthService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig
    },
    { provide: SETTINGS, useValue: {} },
    {
      provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS,
      useValue: { hasBackdrop: false }
    },
    D3Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
