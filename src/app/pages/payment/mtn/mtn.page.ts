import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { StorageService } from '../../../service/storage/storage.service';
import { UserService } from '../../../service/users/user.service';
import { ShareService } from '../../../service/shared/share.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../service/authentication/authenticate.service';
import { HandleErrorService } from '../../../service/error-handler/handle-error.service';

@Component({
  selector: 'app-mtn',
  templateUrl: './mtn.page.html',
  styleUrls: ['./mtn.page.scss'],
})
export class MtnPage implements OnInit {
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
        console.log('payment result', result);
        if (!(Object.keys(result).length > 0) ) {
          this.disable = false;
          this.spinner = false;
          this.authService.presentToast('warning', 'Server Failure, please check your internet connection!', 'top', 4000);
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
            this.checkPaymentStatus(result.paymentId, phone);
          }, 10000);
        }
      }, error => {
        console.log('error payment status', error);
        this.errorhandle.errorResponses(error);
        this.spinner = false;
        this.disable = false;
        this.authService.presentToast('danger', 'An error occur at the server pls contact the admin', 'top', 5000);
      }
    );
  }

  checkPaymentStatus(id, phone){
    const tid = id;
    this.userService.paymentStatus(id).subscribe(
      (result: any) => {
        console.log('payment status', result);
      }, error => {
        console.log('payment status errors', error);
        if (error.error.text === 'PAYMENT_SUCCESSFUL'){
          this.paymentSuccess(phone);
        } else if (error.error.text === 'TRANSACTION_CANCIL'){
          this.spinner = false;
          this.disable = false;
        } else if (error.error.text === 'PAYMENT_FAIL'){
          this.shareService.emitFailure('fail');
          this.spinner = false;
          this.disable = false;
          this.authService.presentToast('danger', 'Your payment was not Successful, please try again in about 5 minis time', 'top', 6000);
          this.router.navigate(['user/subject']);
        } else if (error.error.text === 'TRANSACTION_IN_PROGRESS') {
          console.log('transaction in progress');
          setTimeout(() => { this.checkPaymentStatus(tid, phone); }, 2000);
        }
        console.log('error from checking status', JSON.parse(JSON.stringify(error)));
      }
    );
  }

  paymentSuccess(phone){
    this.userService.registereUserPayment(phone).subscribe(
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
