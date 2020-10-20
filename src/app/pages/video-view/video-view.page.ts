import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../service/users/user.service';
import { HandleErrorService } from '../../service/error-handler/handle-error.service';


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
  items = [];
  videos = [];
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
        this.items = response[1];
        console.log(response);
        this.subjectName = response[2].name;
        this.subjectAuthor = response[2].author;
        const arr = this.groupByType(this.items);
        this.videos = arr;
        this.defaultUrl = response[2].url;
        console.log('new array', this.defaultUrl);
      },
      (error: any) => {
        this.errorHandle.errorResponses(error);
      }

    );
  }
  groupByType(array){
    return array.reduce((r, a) => {
          r[a.topic_name] = r[a.topic_name] || [];
          r[a.topic_name].push(a);
          return r;
      }, Object.create(null));
  }

  playVideo(url, index){
    this.defaultUrl = url;
    console.log('the index', index);
    console.log('the url', url);
  }
}
