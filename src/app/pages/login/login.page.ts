import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { ShareService } from '../../service/shared/share.service';
import { StorageService } from '../../service/storage/storage.service';
import { Plugins } from '@capacitor/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';

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
    this.isLogin();
  }

  isLogin(){
    return from(this.storageService.get('token').then(result => {
      if (result === null) {
         this.router.navigate(['/login']);
        } else {
         this.router.navigate(['public/home']);
        }
      }));
  }
  loginForm(){
    this.load = true;
    this.authenticateService.loginUser(this.userLogin.value).subscribe(
     (response: any) => {
       this.load = false;
       localStorage.setItem('token', response.accessToken);
       this.storageService.setObject('userInfo', response[0].userInfo);
       this.storageService.setObject('userDetails', response[1].userDetails);
       this.storageService.setObject('token', response.accessToken);
       this.storageService.setObject('expire', response.expires_at);
       this.storeToken(response.accessToken);
       this.shareService.emitToken(response.accessToken);
       this.authenticateService.presentToast('success', 'Login Successfully. Welcome ' + response[0].userInfo.fullName + '', 'top', 5000);
       this.shareService.emitUserInfo(this.storageService.getObject('userDetails'), this.storageService.getObject('userInfo'));
      //  setTimeout(() => {
      //  window.location.reload();
       this.router.navigate(['public/home']);
        // }, 2000);
     },
     (error: any) => {
       this.handleService.errorResponses(error);
       this.load = false;
     }
   );
  }
  private storeToken(token){
    Plugins.Storage.set({key: 'token', value: token});
  }

  public OpenListing() {
    this.navCtrl.navigateForward('/register');
}
}
