import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonEvent } from '@ionic/core';
import { StorageService } from 'src/app/service/storage/storage.service';
import { TranslationService } from 'src/app/service/translation/translation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage {
  loader: boolean;
  who_are_we = this.translate.getMessage('who_we_are');
  who_are_we_for = this.translate.getMessage('who_we_are_for');
  constructor(private storageService: StorageService, private router: Router, private translate: TranslationService) { }

  ionViewDidEnter() {
    this.storageService.get('userDetails').then(
      data => {
        const format = JSON.parse(data);
        if (format.user_id){
          // this.getUsersDownload(format.user_id);
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
      event.target.complete();
  }

  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/public/home']);
    });
  }

}
