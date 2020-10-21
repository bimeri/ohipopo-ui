import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../../service/shared/share.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-mtn',
  templateUrl: './mtn.page.html',
  styleUrls: ['./mtn.page.scss'],
})
export class MtnPage implements OnInit {
userInfo: User;
  constructor(private shareService: ShareService) { }

  ngOnInit(): void {
    this.userInfo = this.shareService.getUserinfo();
  }

}
