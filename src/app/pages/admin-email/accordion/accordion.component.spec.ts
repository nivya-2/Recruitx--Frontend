import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccordionModule } from 'primeng/accordion';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccordionComponent,
        AccordionModule,
        NoopAnimationsModule, // fixes accordion animation behavior in tests
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize categories and templates from EMAIL_TEMPLATES', () => {
    expect(component.categories.length).toBeGreaterThan(0);
    expect(Object.keys(component.templates).length).toBeGreaterThan(0);
  });

  it('should emit selected template when clicked', () => {
    spyOn(component.templateSelected, 'emit');
    const category = component.categories[0];
    const template = component.getTemplatesForCategory(category)[0];

    component.selectTemplate(template);
    expect(component.selectedTemplate).toEqual(template);
    expect(component.templateSelected.emit).toHaveBeenCalledWith(template);
  });

  it('should display accordion panels for each category', () => {
    const compiled = fixture.debugElement.nativeElement;
    const panels = compiled.querySelectorAll('p-accordion-panel');
    expect(panels.length).toEqual(component.categories.length);
  });
});
