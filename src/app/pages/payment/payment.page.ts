import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';
import { StorageService } from '../../service/storage/storage.service';
import { ShareService } from '../../service/shared/share.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
payments = [
  {name: 'MTN Mobile Money', logo: '../../../assets/img/momo.jpeg', url: 'mtn-payment'},
  {name: 'Orange Money', logo: '../../../assets/img/orange.png', url: '#'},
  {name: 'Express Union', logo: '../../../assets/img/eu.png', url: '#'},
  {name: 'Visa/Master Card', logo: '../../../assets/img/visa.png', url: '#'}
];
  userInfos: any;
  constructor(private storageService: StorageService, private shareService: ShareService) { }

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
