import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../service/authentication/authenticate.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private route: Router, private authService: AuthenticateService) { }

  ngOnInit() {
    setInterval(() => {
      if (this.authService.isLogin() === true){
        this.route.navigate(['/login']);
      } else {this.route.navigate(['/register']);
    }
    }, 4000);
  }

}
