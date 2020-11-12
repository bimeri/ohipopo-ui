import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { environment } from 'src/environments/environment';
import { IonSlides } from '@ionic/angular';


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
  allTopics = [];
  subjectName: string;
  subjectAuthor: string;
  defaultUrl: string;
  videos = [];
  logo = '';
  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService,
              private errorHandle: HandleErrorService ) { }
  ngOnInit() {
    this.activateRoute.paramMap.subscribe(
      paramMap => {
        if (!paramMap.has('topicId')){
          // redirect
          return;
        }
        // tslint:disable-next-line: radix
        this.subjectId = parseInt(paramMap.get('topicId'));
      }
    );
    this.getTopics(this.subjectId);
  }

  getTopics(subjectId){
    this.userService.getAllSubjectsTopicById(subjectId).subscribe(
      (response: any) => {
        this.allTopics = response[0];
        this.videos = response[1];
        console.log(response);
        this.subjectName = response[2].name;
        this.subjectAuthor = response[2].author;
        this.defaultUrl = response[2].url;
        this.logo = `${environment.base_url}/${response[2].logo}`;
      },
      (error: any) => {
        this.errorHandle.errorResponses(error);
      }
    );
  }

  playVideo(url: string, videoName: string){
    this.defaultUrl = '';
    setTimeout(() => {
      this.defaultUrl = url;
      this.subjectName = videoName;
    }, 1000);
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
}
