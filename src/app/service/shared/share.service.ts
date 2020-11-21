import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ShareService {
  constructor() {
   }

  $userInfo = new EventEmitter();
  $userId = new EventEmitter();
  $success = new EventEmitter();
  $failure = new EventEmitter();

  emitUserInfo(userinfo: {}, useretail: {}){
    const info = userinfo;
    const detail = useretail;
    this.$userInfo.emit([info, detail]);
  }

  emitUserId(uid){
    this.$userId.emit(uid);
  }

  emitSuccess(value: string){
    this.$success.emit(value);
  }
   emitFailure(value: string){
    this.$failure.emit(value);
  }
}
