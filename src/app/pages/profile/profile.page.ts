import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/service/shared/share.service';
import { StorageService } from 'src/app/service/storage/storage.service';
import { User } from 'src/app/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userInfos: User;
  loading: boolean;
  loader: boolean;
  formUpdate: FormGroup;
  fullName: string;
  constructor(private shareService: ShareService,
              private fb: FormBuilder,
              private storageService: StorageService) {}

  ngOnInit(){
    this.storageService.getObject('userInfo').then((result: User) => {
      if (result != null) {
        this.userInfos = result;
        this.fullName = result.fullName;
        console.log("user info ", this.userInfos);
        this.shareService.emitUserId(result.id);
      }
      }).catch(e => {
      console.log('error: ', e);
      return e;
      });
      this.formUpdate = this.fb.group({
        userName: ['', [Validators.required, Validators.minLength(4)]],
        fullName: ['', Validators.required],
        contact: ['',[ Validators.required, Validators.minLength(9)]],
        address: ['', Validators.required],
        idCard: [''],
        userId: [''],
      });

      this.formUpdate.patchValue(
        {
          userId: this.userInfos?.id,
          userName: this.userInfos?.userName,
          fullName: this.userInfos?.fullName,
          contact: this.userInfos?.phoneNumber,
          address: this.userInfos?.address,
          idCard: this.userInfos?.school_idCrd
      });
  }
  
  ionViewDidEnter() {
    this.ngOnInit();
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  updateProfile(){
    this.formUpdate.patchValue({userId: this.userInfos.id});
    console.log("user profile", this.formUpdate.value);
  }
}
