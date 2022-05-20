import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { StorageService } from '../../service/storage/storage.service';
import { TranslationService } from 'src/app/service/translation/translation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
category = [];
// tslint:disable-next-line: new-parens
userRegistration: FormGroup;
levels: any = [];
options: any;
load: boolean;
loader: boolean;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticateService,
              private router: Router,
              private translate: TranslationService,
              private handlerService: HandleErrorService,
              private storageService: StorageService ) { }

  ngOnInit() {
    this.load = true;
    this.userRegistration = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
      userName: ['', [Validators.required, Validators.minLength(3)]],
      email: [''],
      category: ['', [Validators.required]],
      level: ['', [Validators.required]],
      address: ['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      check: ['', Validators.required],
     });
    this.getLevelTypes();
    // this.authenticationService.isLogin();
    }

    ngAfterViewInit(){
      this.ngOnInit();
    }

    clearForm(){
      this.userRegistration.reset();
    }

  getLevelTypes(){
    this.levels = [];
    this.authenticationService.getTypes().subscribe(
     response => {
       this.category = response;
       this.load = false;
     },
     error => {
       this.handlerService.errorResponses(error);
       this.load = false;
     }
   );
  }

  getLevel(typeId){
    this.authenticationService.getLevel(typeId).subscribe(
     response => {
      this.levels = response;
     },
     error => {
       console.log('error', error);
     }
   );
  }

  submitForm(){
    let mail = '';
    this.load = true;
    this.loader = true;
    const pass = this.userRegistration.controls.password.value;
    const cpass = this.userRegistration.controls.confirmPassword.value;
    const credential = this.userRegistration.controls.email.value;
    if (pass !== cpass){
      const mess = this.translate.getMessage('wrong_password');
      this.authenticationService.presentToast('danger', mess, 'top', 5000, 'alert-circle-outline');
      this.load = false;
      this.loader = false;
      return;
      }
    if (credential === '') {
        mail = 'student@ohipopo.org';
      } else {
        mail = this.userRegistration.controls.email.value;
      }
    const data: User = {fullName: this.userRegistration.controls.fullName.value,
                  phoneNumber: (this.userRegistration.controls.phoneNumber.value).toString(),
                  userName: this.userRegistration.controls.userName.value,
                  email: mail,
                  level: this.userRegistration.controls.level.value,
                  address: this.userRegistration.controls.address.value,
                  dateOfBirth: this.userRegistration.controls.dateOfBirth.value,
                  password: this.userRegistration.controls.password.value,
                };

    this.authenticationService.registerUser(data).subscribe(
     () => {
       this.load = false;
       this.loader = false;
       const mess = this.translate.getMessage('register_success');
       this.authenticationService.presentToast('success', mess, 'top', 3000, 'checkmark_outline');
       this.storageService.clear();
       setTimeout(() => {
        window.location.href = '/login';
       }, 3000);
     },
     (error: any) => {
       this.loader = false;
       this.load = false;
       this.handlerService.errorResponses(error);
       const mes = this.translate.getMessage('fail_to_register');
       this.authenticationService.presentToast('danger', mes, 'top', 6000, 'alert-circle-outline');
     }
   );
  }

  termsAndCondition(){
    this.router.navigate(['/register']).then(result => {window.location.href = 'https://www.ohipopo.org/terms-and-conditions/'; });
   }
}
