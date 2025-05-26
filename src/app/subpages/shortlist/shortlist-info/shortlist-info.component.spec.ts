import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortlistInfoComponent } from './shortlist-info.component';

describe('ShortlistInfoComponent', () => {
  let component: ShortlistInfoComponent;
  let fixture: ComponentFixture<ShortlistInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortlistInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortlistInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
