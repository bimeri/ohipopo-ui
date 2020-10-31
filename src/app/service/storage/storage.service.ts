import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class StorageService {

  constructor(public storage: Storage) { }

  // set key value pair

  async set(key: string, value: string): Promise<any>{
    try{
       await this.storage.set(key, value);
       return true;
    }
    catch (ex) {
      return false;
    }
  }

  // to get a key/value pair
async get(key: string): Promise<any> {
  try {
      const result = await this.storage.get(key);
      if (result != null) {
      return result;
      }
      return null;
    } catch (reason) {
    console.log(reason);
    return null;
    }
  }

  // set a key/value object
async setObject(key: string, object: {}) {
  try {
    const result = await this.storage.set(key, JSON.stringify(object));
    // console.log('set Object in storage: ', result);
    return true;
    } catch (reason) {
    // console.log('exception storing object', reason);
    return false;
    }
  }

  // get a key/value object
async getObject(key: string): Promise<any> {
  try {
    const result = await this.storage.get(key);
    if (result != null) {
    return JSON.parse(result);
    }
    return null;
    } catch (reason) {
    console.log(reason);
    return null;
    }
  }

  // remove a single key value:
remove(key: string) {
  this.storage.remove(key);
  }

  // clear storage
  clear() {
  this.storage.clear();
  }

}
