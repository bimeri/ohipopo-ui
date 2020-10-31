import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../service/shared/share.service';
import { StorageService } from '../../service/storage/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfos: any;

  constructor(private shareService: ShareService, private storageService: StorageService) { }

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
