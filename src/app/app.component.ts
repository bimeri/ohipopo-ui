import { Component, OnInit } from '@angular/core';

import { LoadingController, Platform } from '@ionic/angular';
import { Plugins, Capacitor } from '@capacitor/core';
import { AuthenticateService } from './service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { StorageService } from './service/storage/storage.service';
import { ShareService } from './service/shared/share.service';
import { BackButtonEvent } from '@ionic/core';
const { App } = Plugins;

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
  public appPages = [
    {
      title: 'Home',
      url: '/public/home',
      icon: 'home'
    },
    {
      title: 'Transactions',
      url: '/transaction',
      icon: 'cash'
    },
    // {
    //   title: 'Edit Profile',
    //   url: '/public/profile',
    //   icon: 'create'
    // },
    // {
    //   title: 'My Downloads',
    //   url: '/public/downloads',
    //   icon: 'arrow-down-circle'
    // },
    // {
    //   title: 'Current Subscription',
    //   url: '/public/subscribed',
    //   icon: 'thumbs-up'
    // },
    // {
    //   title: 'Notification Center',
    //   url: '/public/messages',
    //   icon: 'notifications'
    // },
    // {
    //   title: 'My Quiz Results',
    //   url: '/public/quize',
    //   icon: 'bulb'
    // },
    // {
    //   title: 'Settings',
    //   url: '/public/settings',
    //   icon: 'settings'
    // },
    // {
    //   title: 'Support',
    //   url: '/public/supports',
    //   icon: 'umbrella'
    // },
    // {
    //   title: 'About',
    //   url: '/public/about',
    //   icon: 'chatbubble-ellipses'
    // },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  showSplash = true;
  hide: boolean;
  constructor(
    private platform: Platform,
    private authService: AuthenticateService,
    private router: Router,
    private storageService: StorageService,
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
      message: 'Please wait...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
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
        this.authService.presentToast('success', 'logout successfully', 'bottom', 2000);
        this.login = false;
        this.router.navigateByUrl('login');
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
