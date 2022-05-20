import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaguagePageRoutingModule } from './language-routing.module';

import { LanguagePage } from './language.page';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    LaguagePageRoutingModule
  ],
  declarations: [LanguagePage]
})
export class LanguagePageModule {}
