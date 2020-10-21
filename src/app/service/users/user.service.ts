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
    return this.http.get<any>(`${this.pathDir}/subject?levelId=${levelId}`, {headers: this.header});
  }

  getUserRegisteredSubject(userId: number){
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
