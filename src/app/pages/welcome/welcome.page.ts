import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/model/user-detail';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { ShareService } from '../../service/shared/share.service';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
  levelName: string;
  levelId: number;
  userType: boolean;
  dates = new Date();
  show: boolean ;
  constructor(private authenticationService: AuthenticateService,
              private router: Router,
              private shareService: ShareService,
              private userService: UserService,
              private errorHandle: HandleErrorService) { }

  ngOnInit() {
    this.getUserDetail();
    this.getSubject();
    if (this.authenticationService.isLogin()){
      this.router.navigate(['public/home']);
    }
    if (localStorage.hasOwnProperty('userDetails')) {
        this.router.navigate(['public/home']);
      } else {
        this.router.navigate(['/login']);
     }
  }

  getUserDetail(){
    const details: UserDetail = this.shareService.getUserDetails();
    this.levelId = details.levelId;
   }

   getSubject(){
     this.userService.getAllSubject(this.levelId).subscribe(
       (response: any) => {
         this.levelName = response.levelName;
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
       this.show = !this.show;
     } else {
      this.authenticationService.presentToast('tertiary', 'Coming soon...', 'bottom', 1000);
     }
     return;
   }

}
