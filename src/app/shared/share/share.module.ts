import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { ModalPageComponent } from '../../components/modal-page/modal-page.component';


@NgModule({
  declarations: [HeaderComponent, ModalPageComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    ModalPageComponent
    ]
})
export class ShareModule { }
