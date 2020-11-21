import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { User } from '../../model/user';
import { Router } from '@angular/router';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
category = [];
// tslint:disable-next-line: new-parens
dates = new Date;
userRegistration: FormGroup;
levels: any = [];
options: any;
load: boolean;
loader: boolean;
  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticateService,
              private router: Router,
              private handlerService: HandleErrorService ) { }

  ngOnInit() {
    this.load = true;
    this.userRegistration = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]],
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
    this.load = true;
    this.loader = true;
    const pass = this.userRegistration.controls.password.value;
    const cpass = this.userRegistration.controls.confirmPassword.value;
    if (pass !== cpass){
      const mess = 'Password Mismatch, both password do not match.';
      this.authenticationService.presentToast('danger', mess, 'top', 5000);
      this.load = false;
      this.loader = false;
      return;
      }
    const data: User = {fullName: this.userRegistration.controls.fullName.value,
                  phoneNumber: (this.userRegistration.controls.phoneNumber.value).toString(),
                  email: this.userRegistration.controls.email.value,
                  level: this.userRegistration.controls.level.value,
                  address: this.userRegistration.controls.address.value,
                  dateOfBirth: this.userRegistration.controls.dateOfBirth.value,
                  password: this.userRegistration.controls.password.value,
                };
    this.authenticationService.registerUser(data).subscribe(
     (result: any) => {
       this.load = false;
       this.loader = false;
       const mess = 'Your Registration was Successful, You can now sign in to your account.';
       this.authenticationService.presentToast('success', mess, 'top', 6000);
       this.router.navigate(['/login']);
     },
     (error: any) => {
       this.loader = false;
       this.load = false;
       this.handlerService.errorResponses(error);
       const mes = 'Fail to register to Ohipopo School, please try again';
       this.authenticationService.presentToast('danger', mes, 'top', 6000);
     }
   );
  }
}
