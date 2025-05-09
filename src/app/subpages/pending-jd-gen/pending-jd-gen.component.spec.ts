import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingJdGenComponent } from './pending-jd-gen.component';

describe('PendingJdGenComponent', () => {
  let component: PendingJdGenComponent;
  let fixture: ComponentFixture<PendingJdGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingJdGenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingJdGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
