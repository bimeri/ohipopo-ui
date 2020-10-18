import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { ShareService } from '../shared/share.service';
import { User } from '../../model/user';
import { ToastController } from '@ionic/angular';
import { Token } from '../../model/token';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticateService {
registerUrl = `${environment.base_url}/api/auth/register`;
header = this.sharedService.headerRequest;
  constructor(private http: HttpClient,
              private sharedService: ShareService,
              private toastController: ToastController) { }

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
    return this.http.post<any>(this.registerUrl, userinfo, {headers: this.header});
  }

  loginUser(user: { phoneNumber: string; password: string}): Observable<User> {
    // this.$isLoggedIn.emit(user);
    return this.http
      .post<any>(`${environment.base_url}/api/auth/login`, user)
      .pipe(tap(data => this.doLoginUser(data)));
  }
  public doLoginUser(data: Token) {
    localStorage.setItem('Token', data.accessToken);
    localStorage.setItem('expire', data.expires_at);
    localStorage.setItem('type', data.type);
  }

  isLogin(){
    if (localStorage.hasOwnProperty('userInfo') &&
        localStorage.hasOwnProperty('type') &&
        localStorage.hasOwnProperty('userDetails') &&
        localStorage.hasOwnProperty('Token')) {
         return true;
    }
    return false;
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
