import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage/storage.service';
import { ShareService } from '../../service/shared/share.service';
import { BackButtonEvent } from '@ionic/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage {
payments = [
  {name: 'MTN Mobile Money', logo: '../../../assets/img/momo.jpeg', url: 'mtn-payment'},
  {name: 'Orange Money', logo: '../../../assets/img/orange.png', url: 'orange-payment'},
  {name: 'Express Union', logo: '../../../assets/img/eu.png', url: '/payment'},
  {name: 'Visa/Master Card', logo: '../../../assets/img/visa.png', url: '/payment'}
];
  userInfos: any;
  loading: boolean;
  constructor(private storageService: StorageService, private shareService: ShareService, private router: Router) { }

  ionViewDidEnter() {
    this.loading = true;
    this.loading = true;
    this.storageService.getObject("free").then(
      response => {
        
        if(response){
          this.router.navigate(['/user/subject']);
        } else {
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
    ).catch(e => console.log(e));
    this.backButton();
  };


  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/user/subject']);
    });
  }

}
