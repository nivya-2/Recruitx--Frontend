import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackJrComponent } from './track-jr.component';

describe('TrackJrComponent', () => {
  let component: TrackJrComponent;
  let fixture: ComponentFixture<TrackJrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackJrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackJrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
