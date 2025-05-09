import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedJdComponent } from './closed-jd.component';

describe('ClosedJdComponent', () => {
  let component: ClosedJdComponent;
  let fixture: ComponentFixture<ClosedJdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedJdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedJdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
