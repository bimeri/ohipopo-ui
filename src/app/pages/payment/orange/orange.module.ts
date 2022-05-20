import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OrangePageRoutingModule } from './orange-routing.module';
import { OrangePage } from './orange.page';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    OrangePageRoutingModule
  ],
  declarations: [OrangePage]
})
export class OrangePageModule {}
