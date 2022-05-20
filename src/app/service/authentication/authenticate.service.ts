import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../model/user';
import { ToastController } from '@ionic/angular';
import { from, Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Injectable()
export class AuthenticateService {
registerUrl = `${environment.base_url}/api/auth/register`;
  constructor(private http: HttpClient,
              private toastController: ToastController,
              private storageService: StorageService,
              private router: Router) { }

  async presentToast(colors: string, messages: string, pos, time: number, icons?: string) {
    const toast = await this.toastController.create({
      message: messages,
      duration: time,
      color: colors,
      position: pos,
      buttons: [
        {
          side: 'start',
          icon: icons,
          text: '',
          handler: () => {
            // add a method
          }
        }, {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            // add a method
          }
        }
      ],
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
      const expiringDate = formatDate(result, 'yyyy-MM-dd h:m:s', 'en_US');
      const current = new Date(currentDate).getTime();
      const expire = new Date(expiringDate).getTime();
      if (current > expire) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/public/home']);
      }
    }));
  }

  logout(){
      return this.http.get(`${environment.base_url}/api/auth/logout`);
  }
  getTypes(){
    return this.http.get<any>(`${environment.base_url}/api/types/detail`);
  }
  getLevel(typeId){
    return this.http.get<any>(`${environment.base_url}/api/level/detail?typeId=${typeId}`);
  }

}
