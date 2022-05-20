import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonEvent } from '@ionic/core';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage {

  downloads: any[] = [];
  loader = false;
  message: string;
  constructor(private storageService: StorageService, private router: Router) { }

  ionViewDidEnter() {
    this.storageService.get('userDetails').then(
      data => {
        const format = JSON.parse(data);
        if (format.user_id){
          // this.getUsersDownload(format.user_id);
          this.message = 'Support is not available for the moment. please visit our website, or talk to us via whatapp';
        } else {
          this.downloads = [];
          this.message = 'You don\'t have any download';
          this.loader = false;
        }
      }
    ).catch((error) => {
    });
    this.backButton();
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  doRefresh(event) {
    this.downloads = null;
      event.target.complete();
  }

  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/public/home']);
    });
  }

}
