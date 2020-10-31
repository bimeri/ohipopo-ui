import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StorageService } from '../storage/storage.service';
import { from, Observable } from 'rxjs';

@Injectable()
export class ShareService {
 tokenn = localStorage.getItem('token');
public headerRequest = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: 'Bearer ' + this.tokenn});
  constructor(private storage: Storage) {
    // this.$token.subscribe(data => {this.token = data; });
   }

  $token = new EventEmitter();
  $userInfo = new EventEmitter();
  $userId = new EventEmitter();
  $payment = new EventEmitter();

  emitUserInfo(userinfo: {}, useretail: {}){
    const info = userinfo;
    const detail = useretail;
    this.$userInfo.emit([info, detail]);
  }

  emitToken(token){
    // this.tokenn = token;
    this.$token.emit(token);
  }

  emitUserId(uid){
    this.$userId.emit(uid);
  }

  emitPayment(value){
    this.$payment.emit(value);
  }
}
