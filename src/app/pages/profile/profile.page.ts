import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/shared/share.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfos: any;
  loading: boolean;

  constructor(private shareService: ShareService,
              private storageService: StorageService) { }

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
}
