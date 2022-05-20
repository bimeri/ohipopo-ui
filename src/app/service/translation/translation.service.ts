import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
// import { Device } from '@capacitor/device';

@Injectable()
export class TranslationService {

  public messages = {};
  public language = navigator.language.substring(0,2) || 'en';
  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getMessage(key: string) {
    return this.messages[key] || key;
  }

  getTranslationMessages() {
    if (this.localStorageService.hasValue('language')) {
      this.language = this.localStorageService.get('language');
    }
    return new Promise<{}>(
      (resolve, reject) => {
        const transPath = `assets/lang/${this.language}.json`;
        this.http.get<{}>(transPath).subscribe(
          message => {
            if (message) {
              this.messages = message;
              resolve(this.messages);
            }
          }, error => {
            resolve(this.messages);
          }
        );
      });
  }
}
