import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';
import { HandleErrorService } from 'src/app/service/error-handler/handle-error.service';
import { ShareService } from 'src/app/service/shared/share.service';
import { UserService } from 'src/app/service/users/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  levelId: number;
  levelName: string;
  subjects: [];
  count = 0;
  subjectCheck: boolean;
  newArrray = [];
  loader = true;
  userId: any;
  apiDir = `${environment.base_url}`;
  constructor(private shareService: ShareService,
              private userService: UserService,
              private errorHandle: HandleErrorService
              ) { }

  ngOnInit() {
      // this.router.navigate(['public/profile']);
    this.getUserDetail();
    this.getSubject();
  }
  getUserDetail(){
    const details: UserDetail = this.shareService.getUserDetails();
    this.levelId = details.levelId;
    const uid = this.shareService.getUserDetails();
    this.userId = uid.id;
   }

   getSubject(){
     this.loader = true;
     this.userService.getAllSubject(this.levelId).subscribe(
       (response: any) => {
         this.levelName = response.levelName;
         this.subjects = response[0];
         console.log(response[0]);
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
     const id = ids.toString();
     if (this.newArrray.includes(id)){
    this.newArrray = this.newArrray.filter(item => item !== id);
     }
     else {
    this.newArrray.push(id);
     }
     console.log('array is', this.newArrray);
     this.count = this.newArrray.length;

   }
   submitValue(){
    this.userService.registerUserSubjects(this.newArrray).subscribe(
      result => {
        console.log('result', result);
      },
      error => {
        this.errorHandle.errorResponses(error);
      }
    );
   }

}
