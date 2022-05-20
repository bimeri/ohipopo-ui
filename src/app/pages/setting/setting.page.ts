import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackButtonEvent } from '@ionic/core';
import { User } from 'src/app/model/user';
import { CbsService } from 'src/app/service/cbs/cbs.service';
import { LocalStorageService } from 'src/app/service/localStorage/local-storage.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {
  downloads: any[] = [];
  loader = false;
  message: string;
  userInfo: User;
  userBenefits: any = [
    {description: 'Top Ohipopo\'s app user', percent: 12},
    {description: 'Top Ohipopo\'s app user htb etb rt rhjysrb rhbr brb hb rbrd yngve srrgb tfdd', percent: 3},
    {description: 'Top Ohipopo\'s app user', percent: 70}
  ];
  userPoint = 0;
  avg = 0;
  userDetails: any;
  constructor(private storageService: StorageService, 
    private localStorageService: LocalStorageService,
    private cbsService: CbsService,
    private router: Router) { }

    ionViewDidEnter() {
    this.storageService.get('userDetails').then(
      data => {
        this.userDetails = data;
        const format = JSON.parse(data);
        if (format.user_id){
          // this.getUsersDownload(format.user_id);
          this.message = 'comming up';
        } else {
          this.downloads = [];
          this.message = 'You don\'t have any download';
          this.loader = false;
        }
      }
    ).catch((error) => { console.log(error);
     });
    this.storageService.get('userInfo').then(
      result => {
        this.userInfo = result;
      }
    ).catch((error) => {console.log(error);
    });
    this.backButton();
    this.getUserPoints();
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

  getUserPoints() {
    this.loader = true;
    // this.cbsService.getUserPoints().subscribe(
    //   (response: any) => {
    //     // this.userPoint = response.point;
    //     this.loader = false;
    //   }, error => {
    //     this.userPoint = 0;
    //     this.loader = false;
    //   }
    // );
    let sum = 0;
      this.userBenefits.forEach(element => {
        sum+=element.percent;
      });
      if(this.userBenefits.length > 0) {
        this.avg = sum/this.userBenefits.length;
      }
      this.userPoint = this.getPoint(this.avg);
      this.loader = false;
  }

  getUserBenefits() {
    this.loader = true;
    this.cbsService.getUserBenefits().subscribe(
      (response: any) => {
        this.localStorageService.set('benefits', JSON.stringify(response));
        this.userBenefits = response;
        this.loader = false;
      }, error => {
        this.userBenefits = [];
        this.loader = false;
      }
    );
  }

  getPoint(sum: number){
    if(sum > 90) return 9;
    if(sum > 80) return 8;
    if(sum > 70) return 7;
    if(sum > 60) return 6;
    if(sum > 50) return 5.5;
    if(sum > 50) return 5;
    if(sum > 4) return 5;
    return 0;

  }

  changePassword() {
    this.router.navigate(['/ui/change-password']);
  }

  updateProfile() {
    this.router.navigate(['/public/profile']);
  }

}
