import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ShareService {
public headerRequest = new HttpHeaders({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`});
  constructor() {
   }

  $token = new EventEmitter();
  $userInfo = new EventEmitter();
  $userId = new EventEmitter();
  $success = new EventEmitter();
  $failure = new EventEmitter();

  emitUserInfo(userinfo: {}, useretail: {}){
    const info = userinfo;
    const detail = useretail;
    this.$userInfo.emit([info, detail]);
  }

  emitToken(token){
    this.$token.emit(token);
  }

  emitUserId(uid){
    this.$userId.emit(uid);
  }

  emitSuccess(value: string){
    this.$success.emit(value);
  }
   emitFailure(value: string){
    this.$failure.emit(value);
  }
}
