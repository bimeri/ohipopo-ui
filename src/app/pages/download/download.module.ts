import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DownloadPageRoutingModule } from './download-routing.module';

import { DownloadPage } from './download.page';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    DownloadPageRoutingModule
  ],
  declarations: [DownloadPage]
})
export class DownloadPageModule {}
