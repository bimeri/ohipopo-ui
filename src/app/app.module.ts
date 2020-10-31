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
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { SplashComponent } from './components/splash/splash.component';
import { IonicStorageModule } from '@ionic/storage';
import { StorageService } from './service/storage/storage.service';
import { ShareService } from './service/shared/share.service';
import { InterceptorProvider } from './interceptors/token.interceptor';

@NgModule({
  declarations: [AppComponent, SplashComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ShareModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserService,
    AuthenticateService,
    HandleErrorService,
    StorageService,
    ShareService,
    VideoPlayer,
    // { provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
