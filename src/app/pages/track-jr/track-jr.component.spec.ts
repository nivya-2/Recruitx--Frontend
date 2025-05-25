import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecruiterHeadTrackJrComponent } from './track-jr.component';


describe('RecruiterHeadDashboardComponent', () => {
  let component: RecruiterHeadTrackJrComponent;
  let fixture: ComponentFixture<RecruiterHeadTrackJrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterHeadTrackJrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterHeadTrackJrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
