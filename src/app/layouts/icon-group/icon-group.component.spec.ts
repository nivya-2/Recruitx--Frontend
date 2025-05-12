import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconGroupComponent } from './icon-group.component';

describe('IconGroupComponent', () => {
  let component: IconGroupComponent;
  let fixture: ComponentFixture<IconGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
