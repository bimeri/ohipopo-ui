import { Component, OnInit } from '@angular/core';
import { HandleErrorService } from 'src/app/service/error-handler/handle-error.service';
import { UserService } from 'src/app/service/users/user.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../service/storage/storage.service';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/service/shared/share.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  levelName: string;
  subjects: [];
  count = 0;
  subjectCheck: boolean;
  newArrray: number[] = [];
  loader = true;
  apiDir = `${environment.base_url}`;
  spinner: boolean;
  userInfos: any;
  constructor(private userService: UserService,
              private errorHandle: HandleErrorService,
              private storageService: StorageService,
              private authenticateService: AuthenticateService,
              private router: Router,
              private shareService: ShareService
              ) { }

  ngOnInit() {
      // this.router.navigate(['public/profile']);
    this.getUserDetail();
    this.storageService.getObject('userInfo').then(result => {
      if (result != null) {
      this.shareService.emitUserId(result.id);
      this.userInfos = result;
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
  }
  getUserDetail(){
    this.storageService.getObject('userDetails').then(result => {
      if (result != null) {
        this.getSubject( result.level_id);
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
   }

   getSubject(levelId){
     this.loader = true;
     this.userService.getAllSubject(levelId).subscribe(
       (response: any) => {
         this.levelName = response.levelName;
         this.subjects = response[0];
         if (response[0].length === 0) {
          this.subjectCheck = true;
         }
         this.loader = false;
       },
       error => {
         this.errorHandle.errorResponses(error);
         this.loader = false;
       }
     );
   }
   pushId(ids: number){
     const id = ids;
     if (this.newArrray.includes(id)){
    this.newArrray = this.newArrray.filter(item => item !== id);
     }
     else {
    this.newArrray.push(id);
     }
     this.count = this.newArrray.length;

   }
   submitValue(){
     this.spinner = true;
     this.userService.registerUserSubjects(this.newArrray).subscribe(
      result => {
        this.authenticateService.presentToast('success', 'Subject Registered successfully', 'top', 4000);
        this.spinner = false;
        this.router.navigate(['user/subject']);
      },
      error => {
        this.errorHandle.errorResponses(error);
        this.spinner = false;
      }
    );
   }

}
