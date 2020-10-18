import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoViewPage } from './video-view.page';

describe('VideoViewPage', () => {
  let component: VideoViewPage;
  let fixture: ComponentFixture<VideoViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VideoViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
