import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Benefit } from 'src/app/model/benefit';
import { environment } from 'src/environments/environment';

@Injectable()
export class CbsService {


  benefitUrl = environment.auth_path;
  constructor(private http: HttpClient) { }

 

  getUserPoints(): Observable<Benefit> {
    return this.http.get<Benefit>(`${this.benefitUrl}/api/protected/reward_points/users`);
  }

  getUserBenefits(): Observable<Benefit[]> {
    return this.http.get<Benefit[]>(`${this.benefitUrl}/api/protected/benefits/user`);
  }
}
