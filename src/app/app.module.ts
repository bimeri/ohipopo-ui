import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ShareModule } from './shared/share/share.module';
import { UserService } from './service/users/user.service';
import { AuthenticateService } from './service/authentication/authenticate.service';
import { HandleErrorService } from './service/error-handler/handle-error.service';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './service/storage/storage.service';
import { ShareService } from './service/shared/share.service';
import { InterceptorProvider } from './interceptors/token.interceptor';
import { DatePipe } from '@angular/common';
import { UserSubjectsPageModule } from './pages/user-subjects/user-subjects.module';
import { SubjectPageModule } from './pages/subject/subject.module';
import { PaymentPageModule } from './pages/payment/payment.module';
import { MtnPageModule } from './pages/payment/mtn/mtn.module';
import { WelcomePageModule } from './pages/welcome/welcome.module';
import { ProfilePageModule } from './pages/profile/profile.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ShareModule,
    UserSubjectsPageModule,
    SubjectPageModule,
    PaymentPageModule,
    MtnPageModule,
    WelcomePageModule,
    ProfilePageModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthenticateService,
    HandleErrorService,
    StorageService,
    ShareService,
    InterceptorProvider,
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
