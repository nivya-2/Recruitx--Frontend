import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderTextComponent } from './header-text.component';

@Component({
  standalone: true,
  imports: [HeaderTextComponent],
  template: `<app-header-text [context]="ctx" [nopad]="noPad">Test Content</app-header-text>`
})
class TestHostComponent {
  ctx: any = 'title';
  noPad = false;
}

describe('HeaderTextComponent (hosted)', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent], 
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the host component and header-text component', () => {
    expect(hostComponent).toBeTruthy();
    const headerEl = fixture.nativeElement.querySelector('app-header-text');
    expect(headerEl).toBeTruthy();
  });

  it('should apply correct class based on context', () => {
    const span = fixture.nativeElement.querySelector('span');

    hostComponent.ctx = 'profile-text';
    fixture.detectChanges();
    expect(span.className).toContain('profile-text');

    hostComponent.ctx = 'unknown';
    fixture.detectChanges();
    expect(span.className).toContain('title'); 
  });

  it('should apply padding style when nopad is true', () => {
    hostComponent.noPad = true;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.style.padding).toBe('0px'); 
  });

  it('should not apply padding when nopad is false', () => {
    hostComponent.noPad = false;
    fixture.detectChanges();
    const span = fixture.nativeElement.querySelector('span');
    expect(span.style.padding).not.toBe('0px');
  });

  it('should project content', () => {
    const span = fixture.nativeElement.querySelector('span');
    expect(span.textContent).toContain('Test Content');
  });
});
