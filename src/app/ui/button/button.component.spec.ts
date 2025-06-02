import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call action and emit functionemit on button click', () => {
    const actionSpy = jasmine.createSpy('action');
    const emitSpy = spyOn(component.functionemit, 'emit');

    component.action = actionSpy;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(actionSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should not call action or emit when disabled is true', () => {
    const actionSpy = jasmine.createSpy('action');
    const emitSpy = spyOn(component.functionemit, 'emit');

    component.action = actionSpy;
    component.disabled = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    expect(actionSpy).not.toHaveBeenCalled();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should bind background color style from input', () => {
    component.color = '#FF0000';
    fixture.detectChanges();

    const buttonEl: HTMLElement = fixture.debugElement.query(By.css('button')).nativeElement;
    const bgColor = getComputedStyle(buttonEl).backgroundColor;
    expect(bgColor).toBe('rgb(255, 0, 0)');
  });
});
