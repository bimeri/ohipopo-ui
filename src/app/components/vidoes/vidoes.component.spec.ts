import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VidoesComponent } from './vidoes.component';

describe('VidoesComponent', () => {
  let component: VidoesComponent;
  let fixture: ComponentFixture<VidoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VidoesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VidoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
