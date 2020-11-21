import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { ShareService } from '../../service/shared/share.service';
import { StorageService } from '../../service/storage/storage.service';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLogin: FormGroup;
  load: boolean;
  constructor(private formBuilder: FormBuilder,
              private authenticateService: AuthenticateService,
              private handleService: HandleErrorService,
              public navCtrl: NavController,
              private router: Router,
              private shareService: ShareService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.userLogin = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [false],
    });
    setTimeout(() => {
      this.isLogin();
    }, 2000);
  }

  isLogin(){
    return from(this.storageService.getObject('expire').then(result => {
      console.log('exp', result);

      const currentDate = formatDate(new Date(), 'yyyy-MM-dd h:m:s', 'en_US');
      const expiringGate = formatDate(result, 'yyyy-MM-dd h:m:s', 'en_US');
      if (currentDate > expiringGate) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/public/home']);
      }
    }));
  }

  loginForm(){
    this.load = true;
    this.authenticateService.loginUser(this.userLogin.value).subscribe(
     (response: any) => {
       this.load = false;
       this.storageService.setObject('userInfo', response[0].userInfo);
       this.storageService.setObject('userDetails', response[1].userDetails);
       this.storageService.setObject('token', response.accessToken);
       this.storageService.setObject('expire', (response.expires_at));
       this.authenticateService.presentToast('success', 'Login Successfully. Welcome ' + response[0].userInfo.fullName + '', 'top', 4000);
       this.shareService.emitUserInfo(response[1].userDetails, response[0].userInfo);
       this.router.navigate(['public/home']);
     },
     (error: any) => {
       this.handleService.errorResponses(error);
       this.load = false;
     }
   );
  }

  public OpenListing() {
    this.navCtrl.navigateForward('/register');
}
}
