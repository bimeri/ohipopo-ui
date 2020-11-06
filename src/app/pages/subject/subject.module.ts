import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubjectPageRoutingModule } from './subject-routing.module';

import { SubjectPage } from './subject.page';
import { ShareModule } from '../../shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubjectPageRoutingModule,
    ShareModule
  ],
  declarations: [SubjectPage]
})
export class SubjectPageModule {}
