import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileBoxComponent } from './profile-box.component';
import { By } from '@angular/platform-browser';

describe('ProfileBoxComponent', () => {
  let component: ProfileBoxComponent;
  let fixture: ComponentFixture<ProfileBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileBoxComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileBoxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should pass fullName to app-profile and app-header-text', () => {
    component.fullName = 'Jins K Varghese';
    component.role = 'Senior Developer';
    fixture.detectChanges();

    // Profile initials should show in <app-profile>
    const profileDebugEl = fixture.debugElement.query(By.css('app-profile'));
    const profileNativeEl: HTMLElement = profileDebugEl.nativeElement;
    expect(profileNativeEl.textContent?.trim()).toContain('JV'); // initials from "Jins K Varghese"

    // Check the first header-text (context="profile-text")
    const headerEls = fixture.debugElement.queryAll(By.css('app-header-text'));
    const nameHeader = headerEls[0].nativeElement as HTMLElement;
    const roleHeader = headerEls[1].nativeElement as HTMLElement;

    expect(nameHeader.textContent?.trim()).toBe('Jins K Varghese');
    expect(roleHeader.textContent?.trim()).toBe('Senior Developer');
  });
});
