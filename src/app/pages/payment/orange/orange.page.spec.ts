import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OrangePage } from './orange.page';

describe('OrangePage', () => {
  let component: OrangePage;
  let fixture: ComponentFixture<OrangePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrangePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OrangePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
