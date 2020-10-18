import { Component, OnInit, ViewChildren } from '@angular/core';
import { VideoOptions, VideoPlayer } from '@ionic-native/video-player/ngx';


@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.page.html',
  styleUrls: ['./video-view.page.scss'],
})
export class VideoViewPage implements OnInit {
options: VideoOptions;
@ViewChildren('player')videoPlayers: VisibilityState;
items = {name: 'chemistry', url: 'https://www.googleapis.com/drive/v3/files/14RITnoJ9ifD88fBVKAvxz-ov6Db1QfQZ?alt=media&key=AIzaSyBESy2yrv_nLukqOdevHfc00mfsw52brGE'};
  constructor(private videoPlayer: VideoPlayer) {
    this.options = {
      scalingMode: 0,
      volume: 0.5
    };
  }
  ngOnInit() {
  }

  playLocalVideo() {
    // Playing a video.
    this.videoPlayer.play('file:///android_asset/www/movie.mp4').then(() => {
      console.log('video completed');
    }).catch(err => {
      alert(err);
    });
  }
  playRemoteVideo() {
    // Playing a video.
    this.videoPlayer.play('https://www.googleapis.com/drive/v3/files/14RITnoJ9ifD88fBVKAvxz-ov6Db1QfQZ?alt=media&key=AIzaSyBESy2yrv_nLukqOdevHfc00mfsw52brGE').then(() => {
      console.log('video completed');
    }).catch(err => {
      alert(err);
    });
  }

  closeVideo() {
    this.videoPlayer.close();
  }

  openFullscreen(elem){

  }
  playInside(elem){

  }
}
