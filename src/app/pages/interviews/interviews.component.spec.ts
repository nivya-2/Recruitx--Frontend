import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewsComponent } from './interviews.component';

describe('ScheduleInterviewsComponent', () => {
  let component: InterviewsComponent;
  let fixture: ComponentFixture<InterviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
