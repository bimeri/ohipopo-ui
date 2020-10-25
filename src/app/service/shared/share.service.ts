import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { User } from 'src/app/model/user';

@Injectable()
export class ShareService {

  constructor(private storageService: StorageService) { }
  $userInfo = new EventEmitter();
  $userId = new EventEmitter();
  public headerRequest = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + this.getAccessToken()
  });

  getUserinfo(): Promise<User>{
    // console.log('fenebrf', JSON.parse(localStorage.getItem('userInfo')));
  return  this.storageService.getObject('userInfo');
    // JSON.parse(localStorage.getItem('userInfo'));
  }
  getUserDetails(){
    return JSON.parse(localStorage.getItem('userDetails'));
  }
  getAccessToken(){
    return localStorage.getItem('Token');
  }

  emitUserInfo(userinfo: {}, useretail: {}){
    const info = userinfo;
    const detail = useretail;
    this.$userInfo.emit([info, detail]);
  }

  emitUserId(uid){
    this.$userId.emit(uid);
  }
}
