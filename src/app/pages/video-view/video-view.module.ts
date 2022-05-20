import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VideoViewPageRoutingModule } from './video-view-routing.module';
import { VideoViewPage } from './video-view.page';
import { VidoesComponent } from '../../components/vidoes/vidoes.component';
import { ShareModule } from 'src/app/shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    VideoViewPageRoutingModule
  ],
  declarations: [VideoViewPage, VidoesComponent]
})
export class VideoViewPageModule {}
