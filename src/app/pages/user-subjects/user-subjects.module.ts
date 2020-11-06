import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSubjectsPageRoutingModule } from './user-subjects-routing.module';

import { UserSubjectsPage } from './user-subjects.page';
import { ShareModule } from '../../shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSubjectsPageRoutingModule,
    ShareModule
  ],
  declarations: [UserSubjectsPage]
})
export class UserSubjectsPageModule {}
