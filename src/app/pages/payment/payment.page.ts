import { Component, OnInit } from '@angular/core';
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
  {name: 'Orange Money', logo: '../../../assets/img/orange.png', url: '/payment'},
  {name: 'Express Union', logo: '../../../assets/img/eu.png', url: '/payment'},
  {name: 'Visa/Master Card', logo: '../../../assets/img/visa.png', url: '/payment'}
];
  userInfos: any;
  loading: boolean;
  constructor(private storageService: StorageService, private shareService: ShareService) { }

  ngOnInit() {
    this.loading = true;
    this.storageService.getObject('userInfo').then(result => {
      this.loading = false;
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
