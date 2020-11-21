import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {
pathDir = `${environment.base_url}/${environment.auth_path}`;
  constructor(private http: HttpClient ) { }

  getAllSubject(levelId: any){
    return this.http.get<any>(`${this.pathDir}/subject?levelId=${levelId}`);
  }

  getUserRegisteredSubject(userId: string){
    return this.http.get<any>(`${this.pathDir}/user/subject?userId=${userId}`);
  }

  getUserDetailByUserId(userId: number){
    return this.http.get<any>(`${this.pathDir}/user/detail?userId=${userId}`);
  }
  getUserDetailBy(){
    return this.http.get<any>(`${this.pathDir}/user/paymentDetal`);
  }

  getAllSubjectsTopicById(subjectId: number){
    return this.http.get<any>(`${this.pathDir}/subject/topics?subjectId=${subjectId}`);
  }

  registerUserSubjects(details){
    return this.http.get<any>(`${this.pathDir}/subject/register?userSubjects=${details}`);
  }

  studentLikeVideo(videoid: number, status: string){
    return this.http.post<any>(`${this.pathDir}/video/like`, {videoId: videoid, value: status});
  }

  countLikeAndDislike(videoid: number){
    return this.http.post<any>(`${this.pathDir}/count/like`, {videoId: videoid});
  }

  viewedVideo(videoid: number){
    return this.http.post<any>(`${this.pathDir}/count/video`, {videoId: videoid});
  }

  makePayment(phone, userName){
    const data = {
      service: '5sMccBwuw2NDOn0Z7Iipz80tpEfEh6zg',
      service_secret: 'x32XtxUzhSP4crtBkhSp4mQevvBCzDMGkQefeYmD21uRUzN6Lnr1xLkNs2vWJKYL',
      phoneNumber: phone,
      country: 'CM',
      currency: 'XAF',
      user: userName,
      };
    return this.http.post<any>(`${this.pathDir}/payment`, data);
  }
  paymentStatus(payid){
    const data = {paymentId: payid};
    return this.http.post<any>(`${this.pathDir}/check`, data);
  }

  registereUserPayment(phone: number){
    const data = {phoneNumber: phone};
    return this.http.post<any>(`${this.pathDir}/registerPayment`, data);
  }
}
