import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage/storage.service';
import { BackButtonEvent } from '@ionic/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  downloads: any[] = [];
  loader = false;
  message: string;
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.storageService.get('userDetails').then(
      data => {
        const format = JSON.parse(data);
        if (format.user_id){
          // this.getUsersDownload(format.user_id);
          this.message = 'you have no subscription';
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

  ionViewDidEnter() {
    this.ngOnInit();
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
