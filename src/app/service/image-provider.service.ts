import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageProviderService {

  base64img = '';
  url: 'http://vortexmobievotingapp.000webhostapp.com/imageUpload.php';

  constructor(public http: HttpClient) {

  }
  setImage(img){
    this.base64img = img;
  }
  getImage(){
    return this.base64img;
  }
}
