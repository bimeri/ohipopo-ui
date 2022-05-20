import { TranslationService } from '../../service/translation/translation.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/service/localStorage/local-storage.service';
import { AuthenticateService } from 'src/app/service/authentication/authenticate.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage {
  searchText: string;
  currentLang = this.localStorageService.hasValue('language') ? (this.localStorageService.get('language') == 'en' ? 'en':'fr') : navigator.language.substring(0,2) || 'en';

  characters = [
    { name: 'Cameroon', lang: this.translationService.getMessage('french'), flag: 'Cameroon' , slog: 'fr', current: this.currentLang === 'fr'},
    { name: 'Cameroon', lang: this.translationService.getMessage('english'), flag: 'Cameroon' , slog: 'en', current: this.currentLang === 'en'},
  ];

  constructor(private localStorageService: LocalStorageService,
              private translationService: TranslationService,
              private auth: AuthenticateService) { }

  ionViewDidEnter() {
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  onChangeLang(lang: string) {

    this.localStorageService.set('language', lang);
    this.translationService.getTranslationMessages();
    const language = lang == 'en'? this.translationService.getMessage('english') : this.translationService.getMessage('french');
    this.auth.presentToast('success', this.translationService.getMessage('language_change_to') + language + ' ' +  this.translationService.getMessage('successfully'), 'bottom', 3000, 'checkmark-outline');
    setTimeout(() => {window.location.reload();}, 3000); 
  }
}
