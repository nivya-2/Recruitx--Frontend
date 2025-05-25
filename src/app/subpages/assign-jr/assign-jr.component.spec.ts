import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignJrComponent } from './assign-jr.component';

describe('AssignJrComponent', () => {
  let component: AssignJrComponent;
  let fixture: ComponentFixture<AssignJrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignJrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignJrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
