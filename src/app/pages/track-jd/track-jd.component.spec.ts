import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackJdComponent } from './track-jd.component';

describe('TrackJdComponent', () => {
  let component: TrackJdComponent;
  let fixture: ComponentFixture<TrackJdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackJdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackJdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
