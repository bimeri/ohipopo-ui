import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/service/shared/share.service';
import { StorageService } from 'src/app/service/storage/storage.service';
import { NavController, Platform } from '@ionic/angular';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import { ImageProviderService } from '../../service/image-provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfos: any;
  base64img = '';
  loading: boolean;

  constructor(private router: Router,
              private shareService: ShareService,
              private storageService: StorageService,
              public imgpov: ImageProviderService,
              public nav: NavController,
              private camera: Camera) { }

  ngOnInit() {
    this.storageService.getObject('userInfo').then(result => {
      if (result != null) {
      this.shareService.emitUserId(result.id);
      this.userInfos = result;
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
  }

  goBack(){
    this.router.navigate(['/public/home']);
  }

}
