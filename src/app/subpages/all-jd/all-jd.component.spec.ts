import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJdComponent } from './all-jd.component';

describe('AllJdComponent', () => {
  let component: AllJdComponent;
  let fixture: ComponentFixture<AllJdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllJdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllJdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
