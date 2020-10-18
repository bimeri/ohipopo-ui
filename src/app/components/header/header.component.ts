import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../service/shared/share.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInfos: any;

  constructor(private shareService: ShareService) { }

  ngOnInit() {
    if (localStorage.getItem('userInfo') !== '') {
      this.userInfos = this.shareService.getUserinfo();
    }
  }
}
