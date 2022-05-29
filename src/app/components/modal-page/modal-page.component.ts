import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.component.html',
  styleUrls: ['./modal-page.component.scss'],
})
export class ModalPageComponent implements OnInit {
dates = new Date();
  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  facebook(){
    this.router.navigate(['/public/home']).then(
      () => {window.location.href = 'https://www.facebook.com/ohipopo.org/'; });
  }
  youTube(){
    this.router.navigate(['/public/home']).then(
      () => {window.location.href = 'https://www.youtube.com/channel/UCal3ZSuH5mImDv2hgA_O1nQ'; });
  }

  instagram(){
    this.router.navigate(['/public/home']).then(
      () => {window.location.href = 'https://www.instagram.com/ohipopo.org0074/'; });
  }

}
