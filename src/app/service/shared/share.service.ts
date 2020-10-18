import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }
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
}
