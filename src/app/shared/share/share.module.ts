import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ]
})
export class ShareModule { }
