import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { StorageService } from '../../service/storage/storage.service';
import { Router } from '@angular/router';
import { BackButtonEvent } from '@ionic/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  levelName: string;
  userType: boolean;
  dates = new Date();
  show: boolean;
  loader = true;
  constructor(private authenticationService: AuthenticateService,
              private userService: UserService,
              private errorHandle: HandleErrorService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    const path = window.location.pathname;
    this.storageService.getObject('userDetails')
    .then(result => {
      if (result != null) {
      this.getSubject(result.level_id);
      }
      }).catch(e => {});
    this.authenticationService.isLogin();
    this.clickBackButton();
  }

  clickBackButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
          this.router.navigate(['/public/home']);
    });
  }

  gotoClass(link){
    this.router.navigate([link]);
  }

   getSubject(levelId){
     this.storageService.getObject('allSubject').then(
       subject => {
         if (!subject){
          this.userService.getAllSubject(levelId).subscribe(
            (response: any) => {
              this.storageService.setObject('allSubject', response);
              if (response.levelName === 'aLevelScience') {
               this.levelName = 'Advanced Level Science';
               this.loader = false;
              }
              else if (response.levelName === 'aLevelArt') {
               this.levelName = 'Advanced Level Art';
               this.loader = false;
              }
              else if (response.levelName === 'oLevel') {
               this.levelName = 'Ordinary Level';
               this.loader = false;
              }
              if (response.typeName === 'partTime') {
                this.userType = true;
                this.loader = false;
              }
            },
            (err: any) => {
              this.errorHandle.errorResponses(err);
              this.loader = false;
            }
          );
          return;
         }
         if (subject.levelName === 'aLevelScience') {
                this.levelName = 'Advanced Level Science';
                this.loader = false;
               }
            else if (subject.levelName === 'aLevelArt') {
            this.levelName = 'Advanced Level Art';
            this.loader = false;
            }
            else if (subject.levelName === 'oLevel') {
            this.levelName = 'Ordinary Level';
            this.loader = false;
            }
         if (subject.typeName === 'partTime') {
              this.userType = true;
              this.loader = false;
            }
       },
      ).catch(e => {console.log(this.errorHandle.errorResponses(e));
     });
   }

   toastMessage(type: string){
     if (this.userType) {
       this.authenticationService.presentToast('danger', 'Available only for Full Time Students', 'bottom', 2500);
       this.show = true;
     } else {
      this.authenticationService.presentToast('tertiary', 'Coming soon...', 'bottom', 1000);
     }
     return;
   }

   close(){
     this.show = false;
   }

   enroll(){
    this.router.navigate(['/']).then(result => {window.location.href = 'https://api.whatsapp.com/send?phone=237652137960&text=Hello%20Ohipopo,%20%20I%20need%20help!%20'; });
   }

   doRefresh(event) {
    setTimeout(() => {
      window.location.reload();
      event.target.complete();
    }, 2000);
  }
}
