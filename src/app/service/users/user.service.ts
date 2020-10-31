import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ShareService } from '../shared/share.service';


@Injectable()
export class UserService {
pathDir = `${environment.base_url}/${environment.auth_path}`;
 header = this.sharedService.headerRequest;
  constructor(private http: HttpClient, private sharedService: ShareService) { }

  getAllSubject(levelId: any){
console.log('the hedaer at this piont', this.header);
return this.http.get<any>(`${this.pathDir}/subject?levelId=${levelId}`, {headers: this.header});
  }

  getUserRegisteredSubject(userId: string){
    return this.http.get<any>(`${this.pathDir}/user/subject?userId=${userId}`, {headers: this.header});
  }

  getUserDetailByUserId(userId: number){
    return this.http.get<any>(`${this.pathDir}/user/detail?userId=${userId}`, {headers: this.header});
  }

  getAllSubjectsTopicById(subjectId: number){
    return this.http.get<any>(`${this.pathDir}/subject/topics?subjectId=${subjectId}`, {headers: this.header});
  }

  registerUserSubjects(details){
    console.log('detail from the service', details);
    return this.http.get<any>(`${this.pathDir}/subject/register?userSubjects=${details}`, {headers: this.header});
  }

  makePayment(phone, userName){
    const data = {
      service: '5sMccBwuw2NDOn0Z7Iipz80tpEfEh6zg',
      service_secret: 'x32XtxUzhSP4crtBkhSp4mQevvBCzDMGkQefeYmD21uRUzN6Lnr1xLkNs2vWJKYL',
      phonenumber: phone,
      amount: 1,
      country: 'CM',
      currency: 'XAF',
      user: userName,
      };
    return this.http.post<any>(`${this.pathDir}/payment`, data, {headers: this.header});
  }
  paymentStatus(payid){
    const data = {paymentId: payid};
    return this.http.post<any>(`${this.pathDir}/check`, data, {headers: this.header});
  }
}
