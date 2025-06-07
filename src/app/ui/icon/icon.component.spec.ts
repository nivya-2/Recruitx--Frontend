import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from './icon.component';
import { By } from '@angular/platform-browser';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the default icon name', () => {
    fixture.detectChanges();
    const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanEl.textContent.trim()).toBe('home');
  });

  it('should apply default styles', () => {
    fixture.detectChanges();
    const styles = component.getIconStyles();
    expect(styles['font-size']).toBe('24px');
    expect(styles['color']).toBe('red');
    expect(styles['transform']).toBe('scale(1)');
  });

  it('should render custom icon name', () => {
    component.name = 'face';
    fixture.detectChanges();
    const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanEl.textContent.trim()).toBe('face');
  });

  it('should apply custom styles when inputs are changed', () => {
    component.size = '48px';
    component.customColor = 'blue';
    fixture.detectChanges();
    const styles = component.getIconStyles();
    expect(styles['font-size']).toBe('48px');
    expect(styles['color']).toBe('blue');
    expect(styles['transform']).toBe('scale(2)');
  });
});
