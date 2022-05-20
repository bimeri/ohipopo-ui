import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/users/user.service';
import { StorageService } from '../../service/storage/storage.service';
import { Transaction } from 'src/app/model/transaction';
import { BackButtonEvent } from '@ionic/core';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage {
transactions: Transaction[] = [];
  loader = true;
  message: string;
  userId: String;
  dates: Date = new Date();
  
  constructor(private userService: UserService,
              private storageService: StorageService,
              private errorService: HandleErrorService,
              private router: Router) { }

  ionViewDidEnter() {
    this.storageService.get('userDetails').then(
      data => {
        const format = JSON.parse(data);
        if (format.user_id){
          this.getUserTransaction(format.user_id);
          this.userId = format.user_id;
        } else {
          this.transactions = [];
          this.message = 'You don\'t have any transaction history';
          this.loader = false;
        }
      }
    ).catch((error) => {
    });
    this.backButton();
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  getUserTransaction(userId){
    this.loader = true;
    this.userService.transactionDetail(userId).subscribe(
      (result) => {
        this.transactions = result;

        if (this.transactions.length === 0) {
        this.message = 'You don\'t have any transaction history';
       }
        this.loader = false;
      },
      error => {
        this.errorService.errorResponses(error);
        this.loader = false;
      }
    );
  }

  getImage(channel: string){
    let image = '';
    if (channel === 'MTN Mobile Money') {
       image = '../../../assets/img/momo.jpeg';
    } else
    if (channel === 'Orange Money') {
      image = '../../../assets/img/orange.png';
    } else {
      image = '';
    }
    return image;
  }

  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/public/home']);
    });
  }

  doRefresh(event) {
    this.transactions = null;
    this.getUserTransaction(this.userId);
    console.log("user id", this.userId);
    
    // setTimeout(() => {
      // window.location.reload();
      event.target.complete();
    // }, 2000);
  }

}
