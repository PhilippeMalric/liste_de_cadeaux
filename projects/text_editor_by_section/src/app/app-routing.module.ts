import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SettingsContainerComponent } from './components/settings/settings/settings-container.component';

import { AdminComponent } from './components/admin/admin.component';
import { VersionOriginaleComponent } from './components/version_originale/version_originale.component';
import { PropositionsComponent } from './components/propositions/propositions.component';
import { Edit_text_by_sectionsComponent } from './components/edit_text_by_sections/edit_text_by_sections.component';
import { AuthGuardService } from './core/core.module';
import { NameGuardService } from './core/auth/auth-guard.service';
import { ExplicationsComponent } from './components/explications/explications.component';
import { RemerciementComponent } from './components/remerciement/remerciement.component';
import { MessageInterPhaseComponent } from './components/message-inter-phase/message-inter-phase.component';
import { FromLinkComponent } from './components/from-link/from-link.component';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { EnregistrementComponent } from './components/enregistrement/enregistrement.component';
import { ResetMotDePasseComponent } from './components/reset-mot-de-passe/reset-mot-de-passe.component';
import { GoogleSheetComponent } from './components/google-sheet/google-sheet.component';
import { ProjetImageComponent } from './components/projet-image/projet-image.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ListDeCadeauxComponent } from './components/list-de-cadeaux/list-de-cadeaux.component';
import { AssociateEmailComponent } from './components/associate-email/associate-email.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mode_d_emploi',
    pathMatch: 'full'
  },
  {
    path: 'message',
    component: MessageInterPhaseComponent
  },
  {
    path: 'remerciement',
    component: RemerciementComponent
  },
  {
    path: 'mode_d_emploi',
    component: ExplicationsComponent
  },
  {
    path: 'settings',
    component: SettingsContainerComponent
  },
  {
    //canActivate: [AuthGuardService],
    path: 'admin_pl',
    component: AdminComponent,
    canActivate: [NameGuardService]
  },
  {
    //canActivate: [AuthGuardService],
    path: 'csv',
    component: GoogleSheetComponent
  },

  {
    path: 'Projet_de_loi',
    component: PropositionsComponent,
    canActivate: [NameGuardService]
  },
  {
    path: 'logos',
    component: ProjetImageComponent
  },

  {
    path: 'edit_text_by_section',
    component: Edit_text_by_sectionsComponent
  },
  {
    path: 'authentification',
    component: AuthentificationComponent
  },
  {
    path: 'enregistrement',
    component: EnregistrementComponent
  },
  {
    path: 'oublie_mot_de_passe',
    component: ResetMotDePasseComponent
  },
  {
    path: 'Upload_file',
    component: UploadFileComponent,
    canActivate: [NameGuardService]
  },
  {
    path: 'liste_de_cadeau',
    component: ListDeCadeauxComponent
  },
  {
    path: 'associate-email',
    component: AssociateEmailComponent,
    canActivate: [NameGuardService]
  },
  

  {
    path: '__',
    component: FromLinkComponent
  },

  {
    path: '**',
    redirectTo: 'message'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      enableTracing: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
