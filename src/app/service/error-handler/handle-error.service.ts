import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authentication/authenticate.service';

@Injectable()
export class HandleErrorService {

  constructor(private authenticateService: AuthenticateService,
              private router: Router) { }

  errorResponses(error: any){
    console.log('the error fron handler service', error);
    if (!(error && Object.keys(error).length === 0)) {
      if (error.status === 401) {
        this.authenticateService.presentToast('danger', 'user not authorize to perform this task', 'top', 5000);
        this.authenticateService.logout();
        this.router.navigate(['/login']);
      }
      if (error.status === 406) {
        this.authenticateService.presentToast('danger', 'fail to login. Invalid user credentials', 'top', 4000);
      }
      if (error.status === 500) {
        this.authenticateService.presentToast('danger', 'Please the server cannot be access at this time, try later', 'top', 5000);
      }
      if (error.status === 404) {
        this.authenticateService.presentToast('danger',
                                              'Oops! the page could not be found from the server, please contact th admin',
                                              'top', 8000);
      }
      if (error.status === 422) {
        this.authenticateService.presentToast('danger', 'fail to login. All the field are required', 'top', 500);
      }
    }
  }
}
