import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleInterviewsComponent } from './schedule-interviews.component';

describe('ScheduleInterviewsComponent', () => {
  let component: ScheduleInterviewsComponent;
  let fixture: ComponentFixture<ScheduleInterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleInterviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleInterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
