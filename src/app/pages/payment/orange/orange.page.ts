
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { StorageService } from '../../../service/storage/storage.service';
import { UserService } from '../../../service/users/user.service';
import { ShareService } from '../../../service/shared/share.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../service/authentication/authenticate.service';
import { HandleErrorService } from '../../../service/error-handler/handle-error.service';

@Component({
  selector: 'app-orange',
  templateUrl: './orange.page.html',
  styleUrls: ['./orange.page.scss'],
})
export class OrangePage implements OnInit {
user: User;
spinner: boolean;
disable = false;
  constructor(private storageService: StorageService,
              private shareService: ShareService,
              private router: Router,
              private userService: UserService,
              private authService: AuthenticateService,
              private errorhandle: HandleErrorService) { }

  ngOnInit(): void {
    this.storageService.getObject('userInfo').then(result => {
      if (result != null) {
        this.user = result;
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
  }

  makePayment(phone, userName){
    this.disable = true;
    this.spinner = true;
    this.userService.makePayment(phone, userName).subscribe(
      result => {
        if (!(Object.keys(result).length > 0) ) {
          this.disable = false;
          this.spinner = false;
          this.authService.presentToast('secondary', 'Server Failure, please check your internet connection!', 'top', 4000);
        }
        if (result.status === 'INVALID_MSISDN'){
          this.authService.presentToast('danger', 'Invalid Phone Number, please check and try again', 'top', 5000);
          this.spinner = false;
          this.disable = false;
        }
        if (result.status === 'MISSING_MSISDN'){
          this.authService.presentToast('danger', 'Yuo entered a wrong phone Number. please enter a valid phone number', 'top', 5000);
          this.spinner = false;
          this.disable = false;
        }
        if (result.status === 'ORDER_ALREADY_EXISTS'){
          this.authService.presentToast('success', 'You have already Paid for this Class', 'top', 5000);
          this.spinner = false;
          this.disable = false;
        }
        if (result.status === 'SERVER_ERROR'){
          this.authService.presentToast('danger', 'An error occur at the server pls contact the admin', 'top', 5000);
          this.spinner = false;
          this.disable = false;
        }
        if (result.message === 'payment pending') {
          setTimeout(() => {
            this.checkPaymentStatus(result.paymentId, phone, result.channel_name);
          }, 8000);
        }
      }, error => {
        this.errorhandle.errorResponses(error);
        this.spinner = false;
        this.disable = false;
        this.authService.presentToast('danger', 'An error occur at the server pls contact the admin', 'top', 5000);
      }
    );
  }

  checkPaymentStatus(id, phone, channel){
    const tid = id;
    this.userService.paymentStatus(id).subscribe(
      (result: any) => {
      }, error => {
        if (error.error.text === 'PAYMENT_SUCCESSFUL'){
          this.paymentSuccess(phone, channel);
        } else if (error.error.text === 'ZERO_STATUS') {
          this.spinner = false;
          this.disable = false;
          this.shareService.emitFailure('fail');
          // tslint:disable-next-line: max-line-length
          this.authService.presentToast('danger', 'You do not have enough money in your account, please recharge your account', 'top', 7000);
          this.router.navigate(['user/subject']);
        }
         else if (error.error.text === 'TRANSACTION_CANCIL'){
          this.spinner = false;
          this.disable = false;
          this.authService.presentToast('danger', 'Your payment was not Successful, transaction has been cancelled', 'top', 6000);
          this.router.navigate(['user/subject']);
        } else if (error.error.text === 'PAYMENT_FAIL'){
          this.shareService.emitFailure('fail');
          this.spinner = false;
          this.disable = false;
          this.authService.presentToast('danger', 'Your payment was not Successful, please try again in about 5 mins time', 'top', 6000);
          this.router.navigate(['user/subject']);
        } else if (error.error.text === 'TRANSACTION_IN_PROGRESS') {
          setTimeout(() => { this.checkPaymentStatus(tid, phone, channel); }, 2000);
        }
      }
    );
  }

  paymentSuccess(phone, channel){
    this.userService.registereUserPayment(phone, channel).subscribe(
      result => {
        this.storageService.setObject('userDetails', result);
        this.shareService.emitSuccess('success');
        this.spinner = false;
        this.disable = false;
        this.authService.presentToast('success', 'Your payment was Successful, you can now view your Subjects', 'top', 4000);
        this.router.navigate(['user/subject']);
      }, error => {
        this.errorhandle.errorResponses(error);
      }
    );
  }
}
