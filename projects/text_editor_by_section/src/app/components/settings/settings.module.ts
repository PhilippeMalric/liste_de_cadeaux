import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsContainerComponent } from './settings/settings-container.component';

@NgModule({
  declarations: [SettingsContainerComponent],
  imports: [CommonModule, SettingsRoutingModule]
})
export class SettingsModule {}
