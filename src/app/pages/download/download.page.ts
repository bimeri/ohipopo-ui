import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/service/storage/storage.service';
import { Router } from '@angular/router';
import { BackButtonEvent } from '@ionic/core';

@Component({
  selector: 'app-download',
  templateUrl: './download.page.html',
  styleUrls: ['./download.page.scss'],
})
export class DownloadPage {
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
          this.message = 'You don\'t have any download';
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
    // this.getUserTransaction(this.userId);
    
    // setTimeout(() => {
      // window.location.reload();
      event.target.complete();
    // }, 2000);
  }

  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/public/home']);
    });
  }
}
