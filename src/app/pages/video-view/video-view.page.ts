import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';
import { Video } from 'src/app/model/video';
import { AuthenticateService } from '../../service/authentication/authenticate.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.page.html',
  styleUrls: ['./video-view.page.scss'],
})
export class VideoViewPage implements OnInit {
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
              public donSanitizer: DomSanitizer,
              private socialSharing: SocialSharing) { }
  ngOnInit() {
    this.activateRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('topicId')){
          return;
        }
        // tslint:disable-next-line: radix
        this.subjectId = parseInt(paramMap.get('topicId'));
      }
    ).unsubscribe();
    this.getTopics(this.subjectId);
  }

  getTopics(subjectId){
    this.userService.getAllSubjectsTopicById(subjectId).subscribe(
      (response: any) => {
        console.log(response[1]);

        this.loader = false;
        this.allTopics = response[0];
        this.videos = response[1];
        this.videoLength = response[1].length === 0;
        this.subjectName = response[2].name;
        this.subjectAuthor = response[2].author;
        this.defaultUrl = response[2].url;
        this.logo = `${environment.base_url}/${response[2].logo}`;
      },
      (error: any) => {
        this.loader = false;
        this.errorHandle.errorResponses(error);
      }
    );
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
      this.authenticationService.presentToast('warning', 'No video selected', 'bottom', 2000);
      return;
    }
    this.userService.studentLikeVideo(this.vIdLike, status).subscribe(
      result => {
        if (result === 'SAVED') {
          this.authenticationService.presentToast('success', 'Saved sucessfully', 'bottom', 2000);
          this.countLikesAndDislike(this.vIdLike);
        }
        if (result === 'UPDATED') {
          this.authenticationService.presentToast('secondary', 'Updated successfully', 'bottom', 2000);
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
   await this.selectedSlide.slideTo(this.segment);
  }

 slideChanged(slides: IonSlides){
    this.selectedSlide = slides;
    slides.getActiveIndex().then(selectedIndex => {
      this.segment = selectedIndex;
    });
  }

  share(){
    this.socialSharing.share('Hey there! I am studying online with Ohipopo. Can you join me? Download the Ohipopo App on playstore',
                              'ohipopo.org',
                              'https://play.google.com/store/apps')
                              .then(() => { }).catch(() => {});
  }
}
