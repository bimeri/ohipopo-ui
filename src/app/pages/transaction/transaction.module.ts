import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionPageRoutingModule } from './transaction-routing.module';

import { TransactionPage } from './transaction.page';
import { ShareModule } from '../../shared/share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    TransactionPageRoutingModule
  ],
  declarations: [TransactionPage]
})
export class TransactionPageModule {}
