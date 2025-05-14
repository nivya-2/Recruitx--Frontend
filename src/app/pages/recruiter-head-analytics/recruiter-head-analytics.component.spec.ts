import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHeadAnalyticsComponent } from './recruiter-head-analytics.component';

describe('RecruiterHeadAnalyticsComponent', () => {
  let component: RecruiterHeadAnalyticsComponent;
  let fixture: ComponentFixture<RecruiterHeadAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterHeadAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterHeadAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
