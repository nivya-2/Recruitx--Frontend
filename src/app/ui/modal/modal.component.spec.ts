import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent, NoopAnimationsModule  ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit false on onHide', () => {
    spyOn(component.visibleChange, 'emit');
    component.onHide();
    expect(component.visibleChange.emit).toHaveBeenCalledWith(false);
  });

  it('should update CSS variable when headerBgColor changes', () => {
    const setPropertySpy = spyOn(document.documentElement.style, 'setProperty');
    component.headerBgColor = '#123456';
    component.ngOnChanges();
    expect(setPropertySpy).toHaveBeenCalledWith('--custom-header-color', '#123456');
  });

  it('should have default values for inputs', () => {
    expect(component.header).toBe('');
    expect(component.tagline).toBe('');
    expect(component.headerBgColor).toBe('#6979F8');
    expect(component.maximizable).toBe(false);
    expect(component.style).toEqual({});
    expect(component.visible).toBe(false);
    expect(component.showHeader).toBe(true);
  });

  it('should accept and reflect input bindings', () => {
    component.header = 'Test Header';
    component.tagline = 'Test Tagline';
    component.headerBgColor = '#FF0000';
    component.maximizable = true;
    component.visible = true;
    component.style = { width: '500px' };
    component.showHeader = false;

    fixture.detectChanges();

    expect(component.header).toBe('Test Header');
    expect(component.tagline).toBe('Test Tagline');
    expect(component.headerBgColor).toBe('#FF0000');
    expect(component.maximizable).toBe(true);
    expect(component.visible).toBe(true);
    expect(component.style).toEqual({ width: '500px' });
    expect(component.showHeader).toBe(false);
  });
});
