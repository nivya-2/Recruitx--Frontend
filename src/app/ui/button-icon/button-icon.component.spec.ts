import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonIconComponent } from './button-icon.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { By } from '@angular/platform-browser';

describe('ButtonIconComponent', () => {
  let component: ButtonIconComponent;
  let fixture: ComponentFixture<ButtonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonIconComponent, ButtonComponent, IconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render label correctly', () => {
    component.label = 'Save';
    fixture.detectChanges();

    const spanEl = fixture.debugElement.query(By.css('.button-icon-content'));
    expect(spanEl.nativeElement.textContent).toContain('Save');
  });

  it('should pass the icon name to app-icon component', () => {
    component.icon = 'check';
    fixture.detectChanges();

    const iconComponent = fixture.debugElement.query(By.directive(IconComponent));
    expect(iconComponent.componentInstance.name).toBe('check');
  });

  it('should pass the color to app-button component', () => {
    component.color = '#ff0000';
    fixture.detectChanges();

    const buttonComponent = fixture.debugElement.query(By.directive(ButtonComponent));
    expect(buttonComponent.componentInstance.color).toBe('#ff0000');
  });

  it('should use default color if not provided', () => {
    fixture.detectChanges();
    // Since the default is set in the component definition, test with initial state
    const buttonComponent = fixture.debugElement.query(By.directive(ButtonComponent));
    expect(buttonComponent.componentInstance.color).toBe('#7b5cfa');
  });
});
