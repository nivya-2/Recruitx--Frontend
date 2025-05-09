import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterLeadDashboardComponent } from './recruiter-lead-dashboard.component';

describe('RecruiterLeadDashboardComponent', () => {
  let component: RecruiterLeadDashboardComponent;
  let fixture: ComponentFixture<RecruiterLeadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterLeadDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterLeadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
