import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.page.html',
  styleUrls: ['./video-view.page.scss'],
})
export class VideoViewPage implements OnInit {
  subjectId: number;
  allTopics = [];
  subjectName: string;
  subjectAuthor: string;
  defaultUrl: string;
  // items = [];
  videos = [];
  logo = '';
  constructor(private activateRoute: ActivatedRoute,
              private userService: UserService,
              private router: Router,
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
        this.defaultUrl = response[1][3].topicVideo[0].videoUrl;
        this.logo = `${environment.base_url}/${response[2].logo}`;
      },
      (error: any) => {
        this.errorHandle.errorResponses(error);
      }
    );
  }
  // groupByType(array){
  //   return array.reduce((r, a) => {
  //         r[a.topic_name] = r[a.topic_name] || [];
  //         r[a.topic_name].push(a);
  //         return r;
  //     }, Object.create(null));
  // }

  playVideo(url: string, videoName: string){
    this.defaultUrl = '';
    setTimeout(() => {
      this.defaultUrl = url;
      this.subjectName = videoName;
    }, 1000);
    // this.router.navigate([`video/view/${url}`]);
  }
}
