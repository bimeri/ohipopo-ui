import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { ShareModule } from '../../shared/share/share.module';

@NgModule({
  imports: [
    IonicModule,
    RegisterPageRoutingModule,
    ShareModule
  ],
  declarations: [RegisterPage]
})
export class RegisterPageModule {}
