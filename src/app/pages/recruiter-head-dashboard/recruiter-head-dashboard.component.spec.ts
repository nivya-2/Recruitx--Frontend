import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterHeadDashboardComponent } from './recruiter-head-dashboard.component';

describe('RecruiterHeadDashboardComponent', () => {
  let component: RecruiterHeadDashboardComponent;
  let fixture: ComponentFixture<RecruiterHeadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterHeadDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterHeadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
