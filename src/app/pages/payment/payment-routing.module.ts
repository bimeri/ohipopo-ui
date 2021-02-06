import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentPage } from './payment.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentPage
  },
  {
    path: 'mtn-payment',
    loadChildren: () => import('./mtn/mtn.module').then( m => m.MtnPageModule)
  },
  {
    path: 'orange-payment',
    loadChildren: () => import('./orange/orange.module').then( m => m.OrangePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentPageRoutingModule {}
