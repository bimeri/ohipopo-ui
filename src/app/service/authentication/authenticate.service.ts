import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShareService } from '../shared/share.service';
import { User } from '../../model/user';
import { ToastController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable()
export class AuthenticateService {
registerUrl = `${environment.base_url}/api/auth/register`;
header = this.sharedService.headerRequest;
  constructor(private http: HttpClient,
              private sharedService: ShareService,
              private toastController: ToastController,
              private storageService: StorageService,
              private router: Router) { }

  async presentToast(colors: string, messages: string, pos, time: number) {
    const toast = await this.toastController.create({
      message: messages,
      duration: time,
      color: colors,
      position: pos,
      keyboardClose: true
    });

    toast.present();
  }

  registerUser(userinfo: User){
    return this.http.post<any>(this.registerUrl, userinfo);
  }

  loginUser(user: { phoneNumber: string; password: string}): Observable<User> {
    return this.http
      .post<any>(`${environment.base_url}/api/auth/login`, user);
  }

  isLogin(){
    return from(this.storageService.getObject('expire').then(result => {
      const currentDate = formatDate(new Date(), 'yyyy-MM-dd h:m:s', 'en_US');
      const expiringGate = formatDate(result, 'yyyy-MM-dd h:m:s', 'en_US');
      if (currentDate > expiringGate) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/public/home']);
      }
    }));
  }

  logout(){
      return this.http.get(`${environment.base_url}/api/auth/logout`, {headers: this.header});
  }
  getTypes(){
    return this.http.get<any>(`${environment.base_url}/api/types/detail`, {headers: this.header});
  }
  getLevel(typeId){
    return this.http.get<any>(`${environment.base_url}/api/level/detail?typeId=${typeId}` , {headers: this.header});
  }
}
