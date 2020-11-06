import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProfilePageRoutingModule } from './profile-routing.module';
import { ProfilePage } from './profile.page';
import { ShareModule } from '../../shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ProfilePageRoutingModule,
    ShareModule
  ],
  declarations: [ProfilePage]
})
export class ProfilePageModule {}
