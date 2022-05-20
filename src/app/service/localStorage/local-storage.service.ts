import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  hasValue(key: string) {
    if (localStorage.hasOwnProperty(key)) {
      return true;
    }
    return false;
  }
}
