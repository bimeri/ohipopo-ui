import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MtnPageRoutingModule } from './mtn-routing.module';

import { MtnPage } from './mtn.page';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    MtnPageRoutingModule
  ],
  declarations: [MtnPage]
})
export class MtnPageModule {}
