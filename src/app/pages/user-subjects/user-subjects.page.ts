import { Component, OnInit } from '@angular/core';
import { ShareService } from '../../service/shared/share.service';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { UserDetail } from 'src/app/model/user-detail';
import { LoadingController, PopoverController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { StorageService } from '../../service/storage/storage.service';

@Component({
  selector: 'app-user-subjects',
  templateUrl: './user-subjects.page.html',
  styleUrls: ['./user-subjects.page.scss'],
})
export class UserSubjectsPage implements OnInit {
subjects: [];
star1: boolean;
star2: boolean;
star3: boolean;
star4: boolean;
star5: boolean;
// tslint:disable-next-line: no-inferrable-types
number: number = 0;
payment = false;
env = `${environment.base_url}`;
loading: boolean;
  constructor(private userService: UserService,
              private handlerService: HandleErrorService,
              private authenticateService: AuthenticateService,
              private router: Router,
              public popoverController: PopoverController,
              public storageService: StorageService,
              public loadingController: LoadingController) { }

  ngOnInit() {
    this.loading = true;
    this.getUserId();
    if (!this.authenticateService.isLogin()){
      this.router.navigate(['/login']);
     }
  }

  getUserId(){
    this.storageService.getObject('userDetails').then(result => {
      if (result != null) {
        this.getUsersSubjects( result.user_id);
        if (result.paid_amount === null){
          this.payment = false;
        }
        else {
          this.payment = true;
        }
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
  }

  checkPayment(subid){
    if (this.payment){
      this.router.navigate(['video-view', subid]);
    }
    else {
      this.router.navigate(['payment']);
    }
  }

  getUsersSubjects(uid){
    this.presentLoading();
    this.userService.getUserRegisteredSubject(uid).subscribe(
      (response: any) => {
        this.subjects = response;
        this.loading = false;
        if (response.length === 0) {
          this.router.navigate(['subject/all']);
        }
      },
      (error: any) => {
        this.handlerService.errorResponses(error);
        this.loading = false;
      }
    );
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: 'PopoverComponent',
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  star_one(){
    this.star1 = true;
    this.star2 = false;
    this.star3 = false;
    this.star4 = false;
    this.star5 = false;
    this.number = 1;
    }

    star_two(){
      this.star1 = true;
      this.star2 = true;
      this.star3 = false;
      this.star4 = false;
      this.star5 = false;
      this.number = 2;
    }

    star_three(){
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = false;
      this.star5 = false;
      this.number = 3;
    }

    star_four(){
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = true;
      this.star5 = false;
      this.number = 4;
    }

    star_five(){
      this.star1 = true;
      this.star2 = true;
      this.star3 = true;
      this.star4 = true;
      this.star5 = true;
      this.number = 5;
    }

}
