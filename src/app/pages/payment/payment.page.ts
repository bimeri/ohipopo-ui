import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
payments = [
  {name: 'MTN Mobile Money', logo: '../../../assets/img/momo.jpeg', url: 'mtn-payment'},
  {name: 'Orange Money', logo: '../../../assets/img/orange.png', url: '#'},
  {name: 'Express Union', logo: '../../../assets/img/eu.png', url: '#'},
  {name: 'Visa/Master Card', logo: '../../../assets/img/visa.png', url: '#'}
];
  constructor() { }

  ngOnInit() {
  }

}
