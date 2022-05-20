import { Component, OnInit } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { AuthenticateService } from './service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { StorageService } from './service/storage/storage.service';
import { ShareService } from './service/shared/share.service';
import { BackButtonEvent } from '@ionic/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslationService } from './service/translation/translation.service';
const { App } = Plugins;
const prefix = environment.prefix;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  userName: string;
  login = false;
  t0 = performance.now();
  imageUpload: FormGroup;
  public appPages = [
    {
      title: this.translate.getMessage("home"),
      url: `${prefix}/home`,
      icon: 'home'
    },
    {
      title: this.translate.getMessage("transaction"),
      url: `${prefix}/transaction`,
      icon: 'cash'
    },
    {
      title: this.translate.getMessage("edit_profile"),
      url: `${prefix}/profile`,
      icon: 'create'
    },
    {
      title: this.translate.getMessage("my_download"),
      url: `${prefix}/downloads`,
      icon: 'arrow-down-circle'
    },
    {
    title: this.translate.getMessage("current_subscription"),
      url: `${prefix}/subscribed`,
      icon: 'thumbs-up'
    },
    {
      title: this.translate.getMessage("notification_center"),
      url: `${prefix}/messages`,
      icon: 'notifications'
    },
    {
      title: this.translate.getMessage("my_quiz"),
      url: `${prefix}/quize`,
      icon: 'bulb'
    },
    {
      title: this.translate.getMessage("settings"),
      url: `${prefix}/settings`,
      icon: 'settings'
    },
    {
      title: this.translate.getMessage("support"),
      url: `${prefix}/supports`,
      icon: 'heart'
    },
    {
      title: this.translate.getMessage("about"),
      url: `${prefix}/about`,
      icon: 'chatbubble-ellipses'
    },
  ];
  public labels = [this.translate.getMessage("family"), this.translate.getMessage("friends"), this.translate.getMessage("notes"), this.translate.getMessage("work"), this.translate.getMessage("travel"), this.translate.getMessage("reminder")];
  showSplash = true;
  hide: boolean;
  constructor(
    private platform: Platform,
    private authService: AuthenticateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private translate: TranslationService,
    private shareService: ShareService,
    public loadingController: LoadingController) {
    this.initializeApp();
    this.shareService.$userInfo.subscribe(data =>
      {
       this.userName = data[1].fullName;
       this.login = true; });
  }
  navigateTo(){
    this.router.navigate(['/']).then(result => {window.location.href = 'https://api.whatsapp.com/send?phone=237652137960&text=Hello%20Ohipopo,%20%20I%20need%20help!%20'; });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        Plugins.SplashScreen.hide();
      }
      timer(3000).subscribe(() => this.showSplash = false);
    });

    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
        const path = window.location.pathname;
        if (path === 'login' || path === '/public/home') {
          App.exitApp();
        }
    });
  }


  // exitApplication() {
  //     App.exitApp();
  // }

  ngOnInit() {
    this.imageUpload = this.formBuilder.group({});
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getUserName();
    setTimeout(() => {
    this.hide = false;
    }, 5000);
  }

  getUserName(){
   this.storageService.getObject('userInfo').then(result => {
    if (result != null) {
    this.userName = result.fullName;
    this.login = true;

    }
    }).catch(e => {
    console.log('error: ', e);
    return e;
    });
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: this.translate.getMessage("signing_out"),
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  onFileUplaod(event){
    const file = event.target.files[0];
    console.log("the file", file);
    
  }

  logoutUser(){
    this.presentLoading();
    this.authService.logout().subscribe(
      () => {
        this.storageService.remove('allSubject');
        this.storageService.remove('userSubject');
        this.storageService.remove('expire');
        this.storageService.remove('token');
        this.storageService.remove('userDetails');
        this.storageService.remove('userInfo');
        this.authService.presentToast('success', this.translate.getMessage("logout_success"), 'bottom', 2000);
        this.login = false;
        this.router.navigateByUrl('login');
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
