import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../authentication/authenticate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class HandleErrorService {

  constructor(private authenticateService: AuthenticateService,
              private router: Router,
              private translate: TranslationService,
              private storageService: StorageService) { }

  errorResponses(error: HttpErrorResponse){
    console.log('the error fron handler service', error);
    if (!(error && Object.keys(error).length === 0)) {
      if (error.status === 401 || error.error.message === 'Unauthenticated') {
        this.authenticateService.presentToast('danger', this.translate.getMessage('not_authorized'), 'top', 5000, 'alert-circle-outline');
        this.storageService.clear();
        this.router.navigate(['/login']);
      }
      if (error.status === 406) {
        this.authenticateService.presentToast('danger', this.translate.getMessage('invalid_credentials'), 'top', 4000, 'alert-circle-outline');
      }
      if (error.status === 500) {
        this.authenticateService.presentToast('danger', this.translate.getMessage('server_error'), 'top', 5000, 'alert-circle-outline');
      }
      if (error.status === 404) {
        this.authenticateService.presentToast('danger',
                                              this.translate.getMessage('page_not_found'),
                                              'top', 8000, 'alert-circle-outline');
      }
      if (error.status === 422) {
        this.authenticateService.presentToast('danger', this.translate.getMessage('login_fail'), 'top', 1000, 'alert-circle-outline');
      }
    }
  }
}
