import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTeamRhComponent } from './my-team-rh.component';

describe('MyTeamRhComponent', () => {
  let component: MyTeamRhComponent;
  let fixture: ComponentFixture<MyTeamRhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTeamRhComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTeamRhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
