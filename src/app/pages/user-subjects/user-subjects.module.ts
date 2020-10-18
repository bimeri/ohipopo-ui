import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSubjectsPageRoutingModule } from './user-subjects-routing.module';

import { UserSubjectsPage } from './user-subjects.page';
import { HeaderComponent } from '../../components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSubjectsPageRoutingModule
  ],
  declarations: [UserSubjectsPage, HeaderComponent]
})
export class UserSubjectsPageModule {}
