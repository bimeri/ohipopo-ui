import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPageRoutingModule } from './setting-routing.module';

import { SettingPage } from './setting.page';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    SettingPageRoutingModule
  ],
  declarations: [SettingPage]
})
export class SettingPageModule {}
