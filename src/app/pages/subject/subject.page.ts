import { Component, OnInit } from '@angular/core';
import { HandleErrorService } from 'src/app/service/error-handler/handle-error.service';
import { UserService } from 'src/app/service/users/user.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../service/storage/storage.service';

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
  newArrray = [];
  loader = true;
  apiDir = `${environment.base_url}`;
  constructor(private userService: UserService,
              private errorHandle: HandleErrorService,
              private storageService: StorageService
              ) { }

  ngOnInit() {
      // this.router.navigate(['public/profile']);
    this.getUserDetail();
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
