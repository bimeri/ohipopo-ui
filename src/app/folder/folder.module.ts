import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FolderPageRoutingModule } from './folder-routing.module';
import { FolderPage } from './folder.page';
import { HeaderComponent } from '../components/header/header.component';
import { ShareModule } from '../shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FolderPageRoutingModule,
    ShareModule
  ],
  declarations: [FolderPage,
      HeaderComponent,
    ]
})
export class FolderPageModule {}
