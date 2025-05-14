import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterAnalyticsComponent } from './recruiter-analytics.component';

describe('RecruiterAnalyticsComponent', () => {
  let component: RecruiterAnalyticsComponent;
  let fixture: ComponentFixture<RecruiterAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterAnalyticsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
