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
              private shareService: ShareService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.userLogin = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [false],
    });
    setTimeout(() => {
      this.isLogin();
    }, 1000);

    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      ev.detail.register(-1, () => {
        const path = window.location.pathname;
        if (path === 'login' || path === 'public/home') {
          App.exitApp();
        }
      });
    });
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

  loginForm(){
    this.load = true;
    this.loading = true;
    this.authenticateService.loginUser(this.userLogin.value).subscribe(
     (response: any) => {
       console.log('response', response);
       
       this.load = false;
       this.loading = false;
       this.storageService.setObject('userInfo', response[0].userInfo);
       this.storageService.setObject('userDetails', response[1].userDetails);
       this.storageService.setObject('token', response.accessToken);
       this.storageService.setObject('expire', (response.expires_at));
       this.authenticateService.presentToast('success', 'Login Successfully. Welcome ' + response[0].userInfo.fullName + '', 'top', 4000);
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

  public OpenListing() {
    this.navCtrl.navigateForward('/register');
}
}
