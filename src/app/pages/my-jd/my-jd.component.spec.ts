import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJdComponent } from './my-jd.component';

describe('TrackJdComponent', () => {
  let component: MyJdComponent;
  let fixture: ComponentFixture<MyJdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyJdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyJdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
