import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJrUploadComponent } from './admin-jr-upload.component';

describe('AdminDashboardComponent', () => {
  let component: AdminJrUploadComponent;
  let fixture: ComponentFixture<AdminJrUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminJrUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminJrUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
