import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticateService } from './service/authentication/authenticate.service';
import { Router } from '@angular/router';
import { ShareService } from './service/shared/share.service';
import { User } from 'src/app/model/user';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  userName: string;
  public appPages = [
    {
      title: 'Edit Profile',
      url: '/public/profile',
      icon: 'create'
    },
    {
      title: 'My Downloads',
      url: '/public/downloads',
      icon: 'arrow-down-circle'
    },
    {
      title: 'Current Subscription',
      url: '/public/subscribed',
      icon: 'thumbs-up'
    },
    {
      title: 'Notification Center',
      url: '/public/messages',
      icon: 'notifications'
    },
    {
      title: 'My Quiz Results',
      url: '/public/quize',
      icon: 'bulb'
    },
    {
      title: 'Settings',
      url: '/public/settings',
      icon: 'settings'
    },
    {
      title: 'Support',
      url: '/public/supports',
      icon: 'umbrella'
    },
    {
      title: 'About',
      url: '/public/about',
      icon: 'chatbubble-ellipses'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  login = false;
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticateService,
    private router: Router,
    private shareService: ShareService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(3000).subscribe(() => this.showSplash = false);

    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    this.getUserName();

    if (this.authService.isLogin()){
      this.login = true;
    }
  }

  getUserName(){
   const name: User = this.shareService.getUserinfo();
   console.log('detail', name);
   if (name) {
    this.userName = name.fullName;
   }
  }

  logoutUser(){
    this.authService.logout().subscribe(
      val => {
        console.log('val', val);
        localStorage.clear();
        this.authService.presentToast('success', 'logout successfully', 'bottom', 2000);
        this.login = false;
        this.router.navigate(['login']);
      },
      error => {
        console.log('error', error);
      }
    );
  }
}
