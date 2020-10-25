import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { StorageService } from '../../../service/storage/storage.service';

@Component({
  selector: 'app-mtn',
  templateUrl: './mtn.page.html',
  styleUrls: ['./mtn.page.scss'],
})
export class MtnPage implements OnInit {
user: User;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.getObject('userInfo').then(result => {
      if (result != null) {
        this.user = result;
        console.log('user info from the mtn com', this.user);
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
  }

}
