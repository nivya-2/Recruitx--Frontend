import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLeadAnalyticsComponent } from './recruiter-lead-analytics.component';

describe('RecruiterLeadAnalyticsComponent', () => {
  let component: RecruiterLeadAnalyticsComponent;
  let fixture: ComponentFixture<RecruiterLeadAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterLeadAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterLeadAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
