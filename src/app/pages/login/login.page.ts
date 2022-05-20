import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { ShareService } from '../../service/shared/share.service';
import { StorageService } from '../../service/storage/storage.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { BackButtonEvent } from '@ionic/core';
import { TranslationService } from 'src/app/service/translation/translation.service';
const { App } = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin: FormGroup;
  load: boolean;
  loading: boolean;
  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private handleService: HandleErrorService,
              public navCtrl: NavController,
              private router: Router,
              private translate: TranslationService,
              private shareService: ShareService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.userLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      userId: [''],
      remember_me: [false],
    });
    this.isLogin();
    this.clickBackButton();
  }

  isLogin(){
    return from(this.storageService.getObject('expire').then(result => {
      const currentDate = formatDate(new Date(), 'yyyy-MM-dd h:m:s', 'en_US');
      const expiringDate = formatDate(result, 'yyyy-MM-dd h:m:s', 'en_US');
      const current = new Date(currentDate).getTime();
      const expire = new Date(expiringDate).getTime();
      if (current > expire) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/public/home']);
      }
    }));
  }

  exitApplication() {
    App.exitApp();
}
clickBackButton(){
  document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
    App.exitApp();
  });
}

tryLogin(){
  this.storageService.getObject('userDetails')
  .then(result => {
    if (result) {
      this.userLogin.patchValue({
        userId: result.user_id
      });
      this.loginForm();
    } else {
      this.userLogin.patchValue({
        userId: null
      });
      this.loginForm();
    }
    }).catch(e => {});
}

  loginForm(){
    this.load = true;
    this.loading = true;
    this.authenticateService.loginUser(this.userLogin.value).subscribe(
     (response: any) => {
       this.load = false;
       this.loading = false;

       if (response === 'IS_LOGGED_IN') {
         this.authenticateService.presentToast('danger', this.translate.getMessage('some_body_login'), 'top', 7000, 'alert-circle-ouline');
         return;
       }
       this.storageService.setObject('userInfo', response[0].userInfo);
       this.storageService.setObject('userDetails', response[1].userDetails);
       this.storageService.setObject('token', response.accessToken);
       this.storageService.setObject('free', response.free);
       this.storageService.setObject('expire', (response.expires_at));
       this.authenticateService.presentToast('success', this.translate.getMessage('welcome_login') + response[0].userInfo.fullName + '', 'top', 4000, 'checkmark-outline');
       this.shareService.emitUserInfo(response[1].userDetails, response[0].userInfo);

       this.storageService.get('check').then(
         result => {
           if (result === 'checked') {
            this.router.navigateByUrl('public/home');
           } else {
           this.router.navigateByUrl('/slider');
           }
         }
       ).catch(e => {console.log('error');
       });
     },
     (error: any) => {
       this.handleService.errorResponses(error);
       this.load = false;
       this.loading = false;
     }
   );
  }

  ngAfterViewInit(){
    this.ngOnInit();
  }

  public OpenListing() {
    this.navCtrl.navigateForward('/register');
}

doRefresh(event) {
  setTimeout(() => {
    window.location.reload();
    event.target.complete();
  }, 2000);
}
}
