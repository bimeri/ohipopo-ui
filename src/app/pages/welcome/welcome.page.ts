import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { ShareService } from '../../service/shared/share.service';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { StorageService } from '../../service/storage/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  levelName: string;
  userType: boolean;
  dates = new Date();
  show: boolean ;
  constructor(private authenticationService: AuthenticateService,
              private shareService: ShareService,
              private userService: UserService,
              private errorHandle: HandleErrorService,
              private storageService: StorageService) { }

  ngOnInit() {
    this.storageService.getObject('userDetails')
    .then(result => {
      if (result != null) {
      this.getSubject(result.level_id);
      }
      }).catch(e => {
      console.log('error: ', e);
      });

    this.storageService.getObject('token')
    .then(result => {
      if (result != null) {
        this.shareService.emitToken(result);
      } else {
      }
      }).catch(e => {
      console.log('error: ', e);
      });

    this.authenticationService.isLogin();
  }

   getSubject(levelId){
     this.userService.getAllSubject(levelId).subscribe(
       (response: any) => {
         if (response.levelName === 'aLevelScience') {
          this.levelName = 'Advanced Level Science';
         }
         else if (response.levelName === 'aLevelArt') {
          this.levelName = 'Advanced Level Art';
         }
         else {
          this.levelName = 'Ordinary Level';
         }
         if (response.typeName === 'partTime') {
           this.userType = true;
         }
       },
       error => {
         this.errorHandle.errorResponses(error);
       }
     );
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
}
