import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
  $userInfo = new EventEmitter();
  public headerRequest = new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + this.getAccessToken()
  });

  getUserinfo(){
    return JSON.parse(localStorage.getItem('userInfo'));
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
}
