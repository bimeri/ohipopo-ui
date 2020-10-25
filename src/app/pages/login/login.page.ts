import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/service/users/user.service';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { ShareService } from '../../service/shared/share.service';
import { StorageService } from '../../service/storage/storage.service';

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
              private router: Router,
              public navCtrl: NavController,
              private shareService: ShareService,
              private userService: UserService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.userLogin = this.formBuilder.group({
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      remember_me: [false],
    });
    if (this.authenticateService.isLogin()){
      this.router.navigate(['public/home']);
     }
  }

  loginForm(){
    this.load = true;
    console.log(this.userLogin.value);
    this.authenticateService.loginUser(this.userLogin.value).subscribe(
     (response: any) => {
      //  console.log('the response', response);
       this.load = false;
       this.storageService.setObject('userInfo', response[0].userInfo);
       this.storageService.setObject('userDetails', response[1].userDetails);
       this.storageService.setObject('Token', response.accessToken);
       this.storageService.setObject('expire', response.expires_at);
       this.authenticateService.presentToast('success', 'Login Successfully. Welcome ' + response[0].userInfo.fullName + '', 'top', 5000);
       localStorage.setItem('userInfo', JSON.stringify({
        id: response[0].userInfo.id,
        fullName: response[0].userInfo.fullName,
        email: response[0].userInfo.email,
        phoneNumber: response[0].userInfo.phoneNumber
      }));
       localStorage.setItem('userDetails', JSON.stringify({
        id: response[1].userDetails.id,
        levelId: response[1].userDetails.level_id,
        amount: response[1].userDetails.amount,
        paidAmount: response[1].userDetails.paid_amount,
        balance: response[1].userDetails.balance,
        deadLine: response[1].userDetails.deadLine,
        subscribes: response[1].userDetails.subscribed
        }));
       this.shareService.emitUserInfo(
        this.storageService.getObject('userDetails'),
        this.storageService.getObject('userInfo'));
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

  public OpenListing() {
    this.navCtrl.navigateForward('/register');
}
}
