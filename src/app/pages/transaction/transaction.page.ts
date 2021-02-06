import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/users/user.service';
import { StorageService } from '../../service/storage/storage.service';
import { formatDate } from '@angular/common';
import { Transaction } from 'src/app/model/transaction';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
transactions: Transaction[] = [];
  loader = true;
  message: string;
  constructor(private userService: UserService,
              private storageService: StorageService,
              private errorService: HandleErrorService) { }

  ngOnInit() {
    this.storageService.get('userDetails').then(
      data => {
        const format = JSON.parse(data);
        if (format.user_id){
          this.getUserTransaction(format.user_id);
        } else {
          this.transactions = [];
          this.message = 'You don\'t have any transaction history';
          this.loader = false;
        }
      }
    ).catch((error) => {
    });
  }

  getUserTransaction(userId){
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

}
