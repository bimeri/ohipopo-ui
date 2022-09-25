import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { StorageService } from '../../service/storage/storage.service';
import { Router } from '@angular/router';
import { BackButtonEvent } from '@ionic/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ModalPageComponent } from 'src/app/components/modal-page/modal-page.component';
import { TranslationService } from 'src/app/service/translation/translation.service';
import { Subscription } from 'rxjs';
// import { log } from 'console';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit, OnDestroy  {
  levelName: string = null;
  userType: boolean;
  show: boolean;
  loader = true;
  dates = new Date();
  intervalId;
  subscription: Subscription;
  constructor(private authenticationService: AuthenticateService,
              private userService: UserService,
              private errorHandle: HandleErrorService,
              private storageService: StorageService,
              private router: Router,
              private alertCtrl: AlertController,
              private translate: TranslationService,
              public modalController: ModalController) { this.loader = true; }

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.dates = new Date();
    });
  }

  ngOnDestroy(){
    clearInterval(this.intervalId);
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

  ionViewDidEnter() {
    this.loader = true;    
    this.storageService.getObject('userDetails')
    .then(result => {
      if (Object.keys(result).length !== 0) {
      this.getSubject(result.level_id);
      return;
      }
      }).catch(e => {});
    this.authenticationService.isLogin();
    this.clickBackButton();
    this.getIsFree();
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  clickBackButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
          this.router.navigate(['/public/home']);
    });
  }

  gotoClass(link){
    this.router.navigate([link]);
  }

  getIsFree(){
    this.userService.getIsFree().subscribe(
      result => {
       this.storageService.setObject('free', result);
      },
      error => {
        console.log(error);
        this.errorHandle.errorResponses(error);
        
      }
    );
  }

   getSubject(levelId){
     this.storageService.getObject('allSubject').then(
       subject => {
         if (!subject){
          this.userService.getAllSubject(levelId).subscribe(
            (response: any) => {
              this.storageService.setObject('allSubject', response);
              response.levelName === 'aLevelScience' ? (this.levelName = 'A-Level Science'): (response.levelName === 'aLevelArt' ? (this.levelName = 'A-Level Art') : (this.levelName = 'Ordinary Level'));
              if (response.typeName === 'partTime') {
                this.userType = true;
              }
            },
            (err: any) => {
              this.errorHandle.errorResponses(err);
              this.loader = false;
            }
          );
          this.loader = false;
          return;
         }
         subject.levelName === 'aLevelScience' ? (this.levelName = 'A-Level Science'): (subject.levelName === 'aLevelArt' ? (this.levelName = 'A-Level Art') : (this.levelName = 'Ordinary Level'));
         if (subject.typeName === 'partTime') {
              this.userType = true;
              this.loader = false;
            }
       },
      ).catch(e => {console.log(this.errorHandle.errorResponses(e));
     });
   }

   toastMessage(type: string){
     if (this.userType) {
      this.alertDisplay();
      //  this.authenticationService.presentToast('danger', this.translate.getMessage("available_for_parttime"), 'bottom', 2500, 'alert-circle-outline');
      //  this.show = true;
     } else {
      this.authenticationService.presentToast('tertiary', this.translate.getMessage("comming_soon"), 'bottom', 1000, 'code-outline');
     }
     return;
   }

   notification(){
     this.authenticationService.presentToast('secondary', this.translate.getMessage("no_notification"), 'bottom', 10000, 'notifications');
   }

   close(){
     this.show = false;
   }

   enroll(){
    this.router.navigate(['/']).then(result => {window.location.href = 'https://api.whatsapp.com/send?phone=237652137960&text=Hello%20Ohipopo,%20%20I%20need%20help!%20'; });
   }

   async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async alertDisplay() {
    const alert = await this.alertCtrl.create({
        header: this.translate.getMessage('service_not_found'),
        subHeader: this.translate.getMessage('for_full_time_student'),
        message: this.translate.getMessage('contact_us'),
        buttons: ['OK']
    });
    await alert.present();
}

   doRefresh(event) {
    setTimeout(() => {
      // window.location.reload();
      this.ngAfterViewInit();
      event.target.complete();
    }, 2000);
  }

  onClick(route: string){
    this.router.navigate([route]);
  }
}
