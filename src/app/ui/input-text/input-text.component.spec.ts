import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputTextComponent } from './input-text.component';
import { InputTextModule } from 'primeng/inputtext';
import { DebugElement } from '@angular/core';
import { NgStyle, NgIf } from '@angular/common';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextComponent, FormsModule, InputTextModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the label with correct font weight', () => {
    component.label = 'Test Label';
    component.fontWeight = 'bold';
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('label'));
    expect(labelEl.nativeElement.textContent).toContain('Test Label');
    expect(labelEl.styles['font-weight']).toBe('bold');
  });

  it('should render a textarea when isTextarea is true', () => {
    component.isTextarea = true;
    fixture.detectChanges();

    const textarea = fixture.debugElement.query(By.css('textarea.textarea'));
    expect(textarea).toBeTruthy();
  });

  it('should render an input when isTextarea is false', () => {
    component.isTextarea = false;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('textarea.input'));
    expect(input).toBeTruthy();
  });

  it('should bind placeholder correctly', () => {
    component.placeHolder = 'Enter text';
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('textarea'));
    expect(input.nativeElement.placeholder).toBe('Enter text');
  });

  it('should disable textarea when disabled is true and isTextarea is true', async () => {
    component.isTextarea = true;
    component.disabled = true;
    fixture.detectChanges();

    await fixture.whenStable(); 

    const textarea = fixture.debugElement.query(By.css('textarea.textarea'));
    expect(textarea).toBeTruthy();
    expect(textarea.nativeElement.disabled).toBeTrue();
  });

  it('should disable input when disabled is true and isTextarea is false', async () => {
    component.isTextarea = false;
    component.disabled = true;
    fixture.detectChanges();

    await fixture.whenStable(); 

    const input = fixture.debugElement.query(By.css('textarea.input'));
    expect(input).toBeTruthy();
    expect(input.nativeElement.disabled).toBeTrue();
  });

  it('should emit valueChange when user types', () => {
    component.isTextarea = true;
    fixture.detectChanges();

    spyOn(component.valueChange, 'emit');

    const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
    textarea.value = 'new value';
    textarea.dispatchEvent(new Event('input'));

    expect(component.valueChange.emit).toHaveBeenCalledWith('new value');
  });

});
