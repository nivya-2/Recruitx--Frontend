import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewassignedjrCardComponent } from './viewassignedjr-card.component';

describe('ViewassignedjrCardComponent', () => {
  let component: ViewassignedjrCardComponent;
  let fixture: ComponentFixture<ViewassignedjrCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewassignedjrCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewassignedjrCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
