import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../service/storage/storage.service';
import { AuthenticateService } from '../service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { TranslationService } from '../service/translation/translation.service';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {
    protected  url = `${environment.base_url}`;
    protected debug = true;

    constructor(private alertCtrl: AlertController,
                private storageService: StorageService,
                private authenticateService: AuthenticateService,
                private translate: TranslationService,
                private router: Router) { }

    // Intercepts all HTTP requests!
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const promise = this.storageService.getObject('token');
        return from(promise).pipe(
             switchMap(data => {
                 this.addToken(request, data);
                 if (data) {
                    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + data) });
                }

                 if (!request.headers.has('Content-Type')) {
                    request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
                }
                 return next.handle(request).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse){
                        }
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        const status = error.status;
                        let reason = error.error.message;
                        if (status === 0) {
                            this.authenticateService.presentToast('secondary', this.translate.getMessage('offline_message'), 'top', 6000, 'warning-outline');
                          }
                        if (status === 422) {
                            if (error.error.message === this.translate.getMessage('invalid_data')) {
                                 reason = this.translate.getMessage('user_name_taken');
                            } else{
                                this.authenticateService.presentToast('secondary', this.translate.getMessage('offline_message'), 'top', 6000);
                            }
                          }
                        if (status < 299){
                            return throwError(error);
                        } else {
                        if (status === 401) {
                            this.authenticateService.presentToast('danger', this.translate.getMessage('not_authorized'), 'top', 5000, 'alert-circle-outline');
                            this.storageService.clear();
                            this.router.navigate(['/login']);
                        }
                        this.presentAlert(status, reason);
                        return throwError(error);
                        }
                    })
                );
            })
        );
    }
    async presentAlert(status, reason) {
        let mess = reason;
        if (status >= 406 && status !== 422) {
            mess = this.translate.getMessage('wrong_credentials');
       }
        if (status >= 500) {
             mess = this.translate.getMessage('contact_ohipopo');
        }
        const alert = await this.alertCtrl.create({
            header: this.translate.getMessage('error'),
            subHeader: this.translate.getMessage('fail_to_authenticate'),
            message: mess,
            buttons: ['OK']
        });
        await alert.present();
    }

    // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }
        return request;
    }
}
