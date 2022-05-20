import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';
import { ModalPageComponent } from '../../components/modal-page/modal-page.component';
import { TranslatePipe } from 'src/pipes/translate/translate.pipe';
import { FilterPipe } from 'src/pipes/filter/filter.pipe';
import { FooterComponent } from 'src/app/components/footer/footer.component';


@NgModule({
  declarations: [HeaderComponent, FooterComponent, ModalPageComponent, TranslatePipe, FilterPipe],
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
    ModalPageComponent,
    FooterComponent,
    TranslatePipe,
    FilterPipe
    ]
})
export class ShareModule { }
