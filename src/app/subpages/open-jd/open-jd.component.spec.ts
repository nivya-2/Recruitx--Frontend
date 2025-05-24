import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenJdComponent } from './open-jd.component';

describe('OpenJdComponent', () => {
  let component: OpenJdComponent;
  let fixture: ComponentFixture<OpenJdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenJdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenJdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
