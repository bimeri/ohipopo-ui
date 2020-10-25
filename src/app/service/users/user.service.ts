import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ShareService } from '../shared/share.service';

@Injectable()
export class UserService {
pathDir = `${environment.base_url}/${environment.auth_path}`;
 header = this.sharedService.headerRequest;
tt: any = null;
  constructor(private http: HttpClient, private sharedService: ShareService, private storage: Storage) { this.get('Token'); }
   get(key) {
    try {
        const result = this.storage.get(key);
        if (result != null) {
        // return result;
        this.tt = result;
        console.log('the vslu rom the header requesrt,', result);
        }
        return null;
      } catch (reason) {
      console.log(reason);
      return null;
      }
    }
  // header = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     Authorization: 'Bearer ' + this.tt
  //   });


  getAllSubject(levelId: any){
    this.get('Token');
    console.log('the heder value is', this.header);
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
}
