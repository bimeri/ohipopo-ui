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
import { BackButtonEvent } from '@ionic/core';

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
  constructor(private userService: UserService,
              private handlerService: HandleErrorService,
              private router: Router,
              public popoverController: PopoverController,
              public storageService: StorageService,
              public loadingController: LoadingController,
              public domSanitizer: DomSanitizer,
              private shareService: ShareService) {
                this.loading = true;
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

    ngOnInit(): void {
      this.loading = true;
    }

    ionViewDidEnter() {
    this.getUserId();
    this.backButton();
  }

  ngAfterViewInit() {
    this.ionViewDidEnter();
  }


  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/public/home']);
    });
  }

  getUserId(){
    this.storageService.getObject('userDetails').then(result => {
      if (result != null) {
        this.getUsersSubjects(result.user_id);
      }
      }).catch(e => {
      return e;
      });
  }

  checkPayment(subid){
    this.loading = true;
    // check id its free is true
    this.storageService.getObject("free").then(
      response => {
        if(response){
          this.router.navigate(['video-view', subid]);
        } else {
          this.storageService.getObject('userDetails').then(res => {
        const result: UserDetail = res;
        this.success = false;
        this.fail = false;
        this.loading = false;
        const currentDate =  Math.ceil(new Date().getTime() / 1000);
        const expireDate =  Number(result.deadLine);
        if (result.deadLine === null) {
              this.router.navigate(['payment']);
              // this.router.navigate(['video-view', subid]);
            } else {
              if (result.paid_amount > 0 && currentDate > expireDate) {
                  this.router.navigate(['payment']);
                  // this.router.navigate(['video-view', subid]);
                  } else {
                    this.router.navigate(['video-view', subid]);
                  }
            }
          }).catch(e => {});
        }
      }
    ).catch(e => console.log(e));
  }

  getUsersSubjects(uid){
    this.storageService.getObject('userSubject').then(
      response => {
        if (!response || response.length === 0) {
          this.userService.getUserRegisteredSubject(uid).subscribe(
            (result: any) => {
              if (result.length === 0) {
                this.router.navigate(['subject/all']);
              }
              this.storageService.setObject('userSubject', result);
              this.subjects = result;
              this.length = result.length;
            },
            (error: any) => {
              this.handlerService.errorResponses(error);
            }
          );
          this.loading = false;
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

  doRefresh(event) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  }
}
