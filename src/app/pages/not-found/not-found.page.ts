import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
})
export class NotFoundPage {

  constructor() { }

  ionViewDidEnter() {
  }
  ngAfterViewInit(){
    this.ionViewDidEnter();
  }
}
