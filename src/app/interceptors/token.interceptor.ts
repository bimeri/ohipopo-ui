import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Observable, throwError, from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../service/storage/storage.service';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {
    protected  url = `${environment.base_url}`;
    protected debug = true;

    constructor( private alertCtrl: AlertController, private storageService: StorageService) { }

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

                //  if (this.debug) {
                //     request = request.clone({ url: this.url + request.url + '?XDEBUG_SESSION_START=1'});
                // }
                 return next.handle(request).pipe(
                    map((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse){
                        }
                        return event;
                    }),
                    catchError((error: HttpErrorResponse) => {
                        console.log('error caught by interceptor', error);
                        const status = error.status;
                        const reason = error.error.message;
                        if (status < 299){ return throwError(error); } else {
                        this.presentAlert(status, reason);
                        return throwError(error);
                        }
                    })
                );
             })
         );
    }
    async presentAlert(status, reason) {
        const alert = await this.alertCtrl.create({
            header: status + ' Error',
            subHeader: 'Fail to authenticate user',
            message: reason,
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
