import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/model/user-detail';
import { HandleErrorService } from 'src/app/service/error-handler/handle-error.service';
import { ShareService } from 'src/app/service/shared/share.service';
import { UserService } from 'src/app/service/users/user.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  levelId: number;
  levelName: string;
  subjects: [];
  selectedSubject: FormGroup;
  count: number;
  subjectCheck: boolean;
  constructor(private router: Router,
              private shareService: ShareService,
              private userService: UserService,
              private errorHandle: HandleErrorService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
      // this.router.navigate(['public/profile']);
      this.selectedSubject = this.formBuilder.group({
        userSubject: this.formBuilder.array([]),
      });
      this.getUserDetail();
      this.getSubject();
  }
  getUserDetail(){
    const details: UserDetail = this.shareService.getUserDetails();
    this.levelId = details.levelId;
   }

   getSubject(){
     this.userService.getAllSubject(this.levelId).subscribe(
       (response: any) => {
         this.levelName = response.levelName;
         this.subjects = response[0];
         if (response[0].length === 0) {
          this.subjectCheck = true;
         }
       },
       error => {
         this.errorHandle.errorResponses(error);
       }
     );
   }

   saveSubjects(){

   }

}
