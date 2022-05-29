import { Component, OnInit, ViewChild } from '@angular/core';
import { HandleErrorService } from 'src/app/service/error-handler/handle-error.service';
import { UserService } from 'src/app/service/users/user.service';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../service/storage/storage.service';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { ShareService } from 'src/app/service/shared/share.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslationService } from 'src/app/service/translation/translation.service';
import { IonContent } from '@ionic/angular';
import { subject } from 'src/app/model/subject';
declare var $: any;
@Component({
  selector: 'app-subject',
  templateUrl: './subject.page.html',
  styleUrls: ['./subject.page.scss'],
})
export class SubjectPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  levelName: string;
  userName: String;
  message: string;
  subjects: subject;
  subjectCount: number;
  maximumSubject: number;
  count = 0;
  label_subject = this.translate.getMessage('label_subject');
  label_subjects = this.translate.getMessage('label_subjects');
  subjectCheck: boolean;
  newArrray: number[] = [];
  loader: boolean;
  apiDir = `${environment.base_url}`;
  spinner: boolean;
  userInfos: any;
  constructor(private userService: UserService,
              private errorHandle: HandleErrorService,
              private storageService: StorageService,
              private authenticateService: AuthenticateService,
              public donSanitizer: DomSanitizer,
              private router: Router,
              private authenticationService: AuthenticateService,
              private translate: TranslationService,
              private shareService: ShareService
              ) { }

    ngOnInit(): void {
      this.loader = true;
    }

    ionViewDidEnter() {
    this.spinner = true;
      // this.router.navigate(['public/profile']);
    this.getSubject();
    this.storageService.getObject('userInfo').then(result => {
      if (result != null) {
      this.shareService.emitUserId(result.id);
      this.userInfos = result;
      this.userName = result.fullName;
      }
      }).catch(e => {
      return e;
      });
      this.spinner = false;
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }
  
   getSubject(){     
     this.loader = true;
     this.storageService.getObject('allSubject').then(
      subject => {
        if (!subject){
         this.loader = false;
         this.router.navigateByUrl('public/home');
        }
        this.subjects = subject[0];
         this.subjectCount = subject[0].length;
         this.maximumSubject =  subject[0][0].level_id == 6 ? 11 : subject[0][0].level_id == 7 || 8 ? 5 : 0;
         if (subject[0].length === 0) {
          this.subjectCheck = true;
         }
         subject.levelName === 'aLevelScience' ? (this.levelName = 'A-Level Science'): (subject.levelName === 'aLevelArt'? (this.levelName = 'A-Level Art') : (this.levelName = 'Ordinary Level'));
      },
     ).catch(e => {console.log(this.errorHandle.errorResponses(e));
    });
    this.loader = false;
   }


   pushId(ids: number, value: boolean){
     window.scrollTo(0,0);
     
     if(!value && this.newArrray.includes(ids)) { 
       this.newArrray = this.newArrray.filter(item => item !== ids);
       this.count = this.newArrray.length;
        this.message = null;
        // $("#DD" + ids).checked = false;
        let va: any = document.getElementById("DD" + ids);
        va.checked = false;
        return;
      }
     this.newArrray.push(ids);
     this.count = this.newArrray.length;
     if((this.count) == this.maximumSubject){
        this.message = this.translate.getMessage('maximum_subject');
        this.authenticationService.presentToast('danger', this.message, 'top', 10000, 'alert-circle-outline');
        this.content.scrollToTop(2000);
     }     
   }

   doRefresh(event) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  }

   submitValue(){
     this.spinner = true;
     this.userService.registerUserSubjects(this.newArrray).subscribe(
      result => {
        this.authenticateService.presentToast('success', this.translate.getMessage('subject_registered_success'), 'top', 4000);
        this.spinner = false;
        this.router.navigate(['user/subject']);
      },
      error => {
        this.errorHandle.errorResponses(error);
        this.spinner = false;
      }
    );
   }

  //  clearForm(){
  //   this.registerSubject.reset();
  // }

}
