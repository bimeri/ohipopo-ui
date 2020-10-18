import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MtnPage } from './mtn.page';

describe('MtnPage', () => {
  let component: MtnPage;
  let fixture: ComponentFixture<MtnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MtnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MtnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
