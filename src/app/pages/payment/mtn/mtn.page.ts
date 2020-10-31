import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { StorageService } from '../../../service/storage/storage.service';
import { UserService } from '../../../service/users/user.service';
import { ShareService } from '../../../service/shared/share.service';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../../service/authentication/authenticate.service';

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
              private authService: AuthenticateService) { }

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
        console.log('the result', result);
        if (result.status === 'ORDER_ALREADY_EXISTS'){
          this.authService.presentToast('success', 'You have already Paid for this Class', 'top', 5000);
          this.router.navigate(['public/home']);
          this.spinner = false;
          this.disable = false;
        }

        console.log('the result from payment is ', result.message);
        if (result.message === 'payment pending') {
          setTimeout(() => {
            this.checkPaymentStatus(result.paymentId);
          }, 8000);
        }
      }, error => {
        console.log('some error resulted from payment', error);
        this.spinner = false;
        this.disable = false;
      }
    );
    // this.shareService.emitPayment('123');
    // this.router.navigate(['user/subject']);
  }

  checkPaymentStatus(id){
    const tid = id;
    this.userService.paymentStatus(id).subscribe(
      result => {
        console.log('result from checking status ', result);
      }, error => {
        if (error.error.text === 'PAYMENT_SUCCESSFUL'){
          this.paymentSuccess();
          console.log('result successfull');
          this.spinner = false;
          this.disable = false;
        } else if (error.error.text === 'TRANSACTION_CANCIL'){
          console.log('Transaction cancil');
          this.spinner = false;
          this.disable = false;
        } else if (error.error.text === 'PAYMENT_FAIL'){
          console.log('payment fail');
          this.spinner = false;
          this.disable = false;
        } else if (error.error.text === 'TRANSACTION_IN_PROGRESS') {
          console.log('transaction in progress');
          setTimeout(() => { this.checkPaymentStatus(tid); }, 2000);
        }
        console.log('error from checking status', JSON.parse(JSON.stringify(error)));
      }
    );
  }

  paymentSuccess(){

  }
}
