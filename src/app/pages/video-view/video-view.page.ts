import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';
import { Video } from 'src/app/model/video';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { BackButtonEvent } from '@ionic/core';
import { TranslationService } from 'src/app/service/translation/translation.service';
import { StorageService } from 'src/app/service/storage/storage.service';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.page.html',
  styleUrls: ['./video-view.page.scss'],
})
export class VideoViewPage {
  @ViewChild('slides', { static: false }) slider: IonSlides;
  selectedSlide: any;
  segment = 0;
  slideOptions = {
    initialSlide: 0,
    slidePerView: 1,
    speed: 400
  };

  subjectId: number;
  videoId: number;
  allTopics = [];
  subjectName: string;
  subjectAuthor: string;
  defaultUrl: string;
  videos: Video[] = [];
  logo = '';
  vIdLike: number;
  like = 0;
  dislike = 0;
  view = 0;
  load: boolean;
  loader = true;
  videoLength: boolean;

  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService,
              private errorHandle: HandleErrorService,
              private authenticationService: AuthenticateService,
              private router: Router,
              public storageService: StorageService,
              private translate: TranslationService,
              public donSanitizer: DomSanitizer,
              private socialSharing: SocialSharing) {}

  ionViewDidEnter() {
    this.loader = true;
    this.activateRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('topicId')){
          return;
        }
        // tslint:disable-next-line: radix
        this.subjectId = parseInt(paramMap.get('topicId'));
      }
    ).unsubscribe();
    this.storageService.getObject("subjectId_" + this.subjectId).then(
      result => {
        if(!result) {
          this.getTopics(this.subjectId);
        } else {
          this.setSubjectsViewDetail(result);
        }
      }
    ).catch(error => { console.log("error getting subjects, root cause: ", error);
    });
    
    this.backButton();
  }

  ngAfterViewInit(){
    this.ionViewDidEnter();
  }

  backButton(){
    document.addEventListener('ionBackButton', (ev: BackButtonEvent) => {
      this.router.navigate(['/user/subject']);
    });
  }

  getTopics(subjectId){
    this.userService.getAllSubjectsTopicById(subjectId).subscribe(
      (response: any) => {   
        response[1].length === 0? null : this.storageService.setObject("subjectId_" + this.subjectId, response);
        this.setSubjectsViewDetail(response);
      },
      (error: any) => {
        this.loader = false;
        this.errorHandle.errorResponses(error);
      }
    );
  }

  setSubjectsViewDetail(response: any){
        this.allTopics = response[0];
        this.videos = response[1];
        this.videoLength = response[1].length === 0;
        this.subjectName = response[2][0].name;
        this.subjectAuthor = response[2][0].author;
        this.defaultUrl = response[2][0].url;
        this.logo = response[2][0].logo;
        this.loader = false;
  }

  playVideo(url: string, videoName: string, vid: number, likes: number, dislike: number, totalView: number){
    this.defaultUrl = '';
    this.vIdLike = vid;
    this.videoId = vid;
    this.like = likes;
    this.dislike = dislike;
    this.view = totalView;
    this.numberVideo(vid);
    setTimeout(() => {
      this.defaultUrl = url;
      this.subjectName = videoName;
    }, 1000);
  }

  numberVideo(vidId){
    this.userService.viewedVideo(vidId).subscribe(
      data => {
        this.view = this.fnum(data);
        this.load = false;
      },
      error => {
        this.errorHandle.errorResponses(error);
        this.load = false;
      }
    );
  }
  fnum(x) {
    if (isNaN(x)) { return x; }
    if (x < 9999) {
      return x;
    }
    if (x < 1000000) {
      return Math.round(x / 1000) + 'K';
    }
    if ( x < 10000000) {
      return (x / 1000000).toFixed(2) + 'M';
    }
    if (x < 1000000000) {
      return Math.round((x / 1000000)) + 'M';
    }
    if (x < 1000000000000) {
      return Math.round((x / 1000000000)) + 'B';
    }
    return '1T+';
  }

  likeVideo(status: string){
    this.load = true;
    if (!this.vIdLike) {
      this.load = false;
      this.authenticationService.presentToast('warning', this.translate.getMessage('no_video_selected'), 'bottom', 2000);
      return;
    }
    this.userService.studentLikeVideo(this.vIdLike, status).subscribe(
      result => {
        if (result === 'SAVED') {
          this.authenticationService.presentToast('success', this.translate.getMessage('save_success'), 'bottom', 2000);
          this.countLikesAndDislike(this.vIdLike);
        }
        if (result === 'UPDATED') {
          this.authenticationService.presentToast('secondary', this.translate.getMessage('update_success'), 'bottom', 2000);
          this.countLikesAndDislike(this.vIdLike);
        }
        this.load = false;
      }, error => {
        this.load = false;
        this.errorHandle.errorResponses(error);
      }
    );
  }

  countLikesAndDislike(vidId){
    this.userService.countLikeAndDislike(vidId).subscribe(
      data => {
        this.like = data.like;
        this.dislike = data.dislike;
        this.load = false;
      },
      error => {
        this.errorHandle.errorResponses(error);
        this.load = false;
      }
    );
  }

 async segmentchange(evt){   
   await this.selectedSlide.slideTo(evt.target.value);
  }

 slideChanged(slides: IonSlides){
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex => {
      this.segment = selectedIndex;
    });
  }

  share(){
    this.socialSharing.share(this.translate.getMessage('social_sharing_message'),
                              'ohipopo.org', '',
                              'https://play.google.com/store/apps/details?id=com.ohipopo.app')
                              .then(() => { }).catch(() => {});
  }
}
