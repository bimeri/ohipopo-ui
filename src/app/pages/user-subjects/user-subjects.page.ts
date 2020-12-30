import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { Router } from '@angular/router';
import { LoadingController, PopoverController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../service/storage/storage.service';
import { ShareService } from '../../service/shared/share.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserDetail } from 'src/app/model/user-detail';

@Component({
  selector: 'app-user-subjects',
  templateUrl: './user-subjects.page.html',
  styleUrls: ['./user-subjects.page.scss'],
})
export class UserSubjectsPage implements OnInit {
subjects: [];
star1: boolean;
star2: boolean;
star3: boolean;
star4: boolean;
star5: boolean;
number = 0;
env = `${environment.base_url}`;
loading: boolean;
success: boolean;
fail: boolean;
length: number;
  userInfos: any;
  constructor(private userService: UserService,
              private handlerService: HandleErrorService,
              private router: Router,
              public popoverController: PopoverController,
              public storageService: StorageService,
              public loadingController: LoadingController,
              public domSanitizer: DomSanitizer,
              private shareService: ShareService) {
                this.shareService.$success.subscribe(data => {
                  if (data) {
                    this.success = true;
                    this.fail = false;
                  }
              });
                this.shareService.$failure.subscribe(data => {
                  if (data) {
                    this.success = false;
                    this.fail = true;
                  }
              });
              }

  ngOnInit() {
    this.loading = true;
    this.getUserId();
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

  getUserId(){
    this.storageService.getObject('userDetails').then(result => {
      if (result != null) {
        this.getUsersSubjects( result.user_id);
      }
      }).catch(e => {
      return e;
      });
  }

  checkPayment(subid){
    this.loading = true;
    this.storageService.getObject('userDetails')
    .then(res => {
      const result: UserDetail = res;
      this.success = false;
      this.fail = false;
      this.loading = false;
      const currentDate =  Math.ceil(new Date().getTime() / 1000);
      const expireDate =  Number(result.deadLine);
      if (result.deadLine === null) {
            this.router.navigate(['payment']);
          } else {
            if (result.paid_amount > 0 && currentDate > expireDate) {
                  this.router.navigate(['payment']);
                } else {
                  this.router.navigate(['video-view', subid]);
                }
          }
      }).catch(e => {});
  }

  getUsersSubjects(uid){
    // this.presentLoading();
    this.storageService.getObject('userSubject').then(
      response => {
        if (!response || response.length === 0) {
          this.userService.getUserRegisteredSubject(uid).subscribe(
            (result: any) => {
              this.storageService.setObject('userSubject', result);
              this.subjects = result;
              this.length = result.length;
              this.loading = false;
              if (result.length === 0) {
                this.router.navigate(['subject/all']);
              }
            },
            (error: any) => {
              this.handlerService.errorResponses(error);
              this.loading = false;
            }
          );
          return;
        }
        this.subjects = response;
        this.length = response.length;
        this.loading = false;
        if (Object.keys(response).length === 0) {
            this.router.navigate(['subject/all']);
          }
      }
    ).catch(e => { console.log('error');
     });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: 'PopoverComponent',
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
