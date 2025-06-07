import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { By } from '@angular/platform-browser';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComponent]  // ✅ use imports for standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should return correct initials for full name with first and last name', () => {
    component.fullName = 'Jins K Varghese';
    expect(component.initials).toBe('JV');
  });

  it('should return correct initials for single word name', () => {
    component.fullName = 'Jins';
    expect(component.initials).toBe('J');
  });

  it('should return empty initials when fullName is empty', () => {
    component.fullName = '';
    expect(component.initials).toBe('');
  });

  it('should display initials in p-avatar label', () => {
    component.fullName = 'Jane Doe';
    fixture.detectChanges();

    const avatarDebugEl = fixture.debugElement.query(By.css('p-avatar'));
    const avatarEl: HTMLElement = avatarDebugEl.nativeElement;

    expect(avatarEl.textContent?.trim()).toBe('JD');
  });

});
