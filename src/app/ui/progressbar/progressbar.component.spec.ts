import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressBar } from 'primeng/progressbar';
import { Tooltip } from 'primeng/tooltip';

import { ProgressbarComponent } from './progressbar.component';

describe('ProgressbarComponent', () => {
  let component: ProgressbarComponent;
  let fixture: ComponentFixture<ProgressbarComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProgressbarComponent, // Since it's a standalone component
        CommonModule,
        ProgressBar,
        Tooltip
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressbarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should initialize with default values', () => {
      expect(component.current).toBe(0);
      expect(component.total).toBe(0);
    });

    it('should accept current input value', () => {
      const testValue = 25;
      component.current = testValue;
      
      expect(component.current).toBe(testValue);
    });

    it('should accept total input value', () => {
      const testValue = 100;
      component.total = testValue;
      
      expect(component.total).toBe(testValue);
    });

    it('should handle negative current values', () => {
      component.current = -10;
      component.total = 100;
      
      expect(component.current).toBe(-10);
      expect(component.percentage).toBe(-10);
    });

    it('should handle negative total values', () => {
      component.current = 50;
      component.total = -100;
      
      expect(component.total).toBe(-100);
      expect(component.percentage).toBe(0); // Since total <= 0, the condition returns 0
    });
  });

  describe('Percentage Calculation', () => {
    it('should calculate correct percentage when total is positive', () => {
      component.current = 25;
      component.total = 100;
      
      expect(component.percentage).toBe(25);
    });

    it('should calculate correct percentage with decimal values', () => {
      component.current = 33;
      component.total = 100;
      
      expect(component.percentage).toBe(33);
    });

    it('should calculate correct percentage with floating point numbers', () => {
      component.current = 1;
      component.total = 3;
      
      expect(component.percentage).toBeCloseTo(33.33, 2);
    });

    it('should return 0 when total is 0', () => {
      component.current = 50;
      component.total = 0;
      
      expect(component.percentage).toBe(0);
    });

    it('should return 0 when both current and total are 0', () => {
      component.current = 0;
      component.total = 0;
      
      expect(component.percentage).toBe(0);
    });

    it('should handle 100% completion', () => {
      component.current = 100;
      component.total = 100;
      
      expect(component.percentage).toBe(100);
    });

    it('should handle over 100% completion', () => {
      component.current = 150;
      component.total = 100;
      
      expect(component.percentage).toBe(150);
    });

    it('should handle very small numbers', () => {
      component.current = 0.1;
      component.total = 1;
      
      expect(component.percentage).toBe(10);
    });

    it('should handle very large numbers', () => {
      component.current = 1000000;
      component.total = 2000000;
      
      expect(component.percentage).toBe(50);
    });
  });

  describe('Template Integration', () => {
    it('should render p-progressBar component', () => {
      fixture.detectChanges();
      
      const progressBar = debugElement.query(By.css('p-progressBar'));
      expect(progressBar).toBeTruthy();
    });

    it('should pass correct value to p-progressBar', () => {
      component.current = 30;
      component.total = 100;
      fixture.detectChanges();
      
      const progressBar = debugElement.query(By.css('p-progressBar'));
      expect(progressBar.nativeElement.getAttribute('ng-reflect-value')).toBe('30');
    });

    it('should update progressBar value when inputs change', () => {
      // Initial values
      component.current = 25;
      component.total = 100;
      fixture.detectChanges();
      
      let progressBar = debugElement.query(By.css('p-progressBar'));
      expect(progressBar.nativeElement.getAttribute('ng-reflect-value')).toBe('25');
      
      // Update values
      component.current = 75;
      fixture.detectChanges();
      
      progressBar = debugElement.query(By.css('p-progressBar'));
      expect(progressBar.nativeElement.getAttribute('ng-reflect-value')).toBe('75');
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined current value', () => {
      component.current = undefined as any;
      component.total = 100;
      
      expect(component.percentage).toBeNaN();
    });

    it('should handle undefined total value', () => {
      component.current = 50;
      component.total = undefined as any;
      
      expect(component.percentage).toBe(0); // Since undefined > 0 is false, the condition returns 0
    });

    it('should handle null current value', () => {
      component.current = null as any;
      component.total = 100;
      
      expect(component.percentage).toBe(0);
    });

    it('should handle null total value', () => {
      component.current = 50;
      component.total = null as any;
      
      expect(component.percentage).toBe(0);
    });
  });

  describe('Input Binding', () => {
    it('should update when current input changes', () => {
      const newCurrent = 60;
      
      component.current = newCurrent;
      fixture.detectChanges();
      
      expect(component.current).toBe(newCurrent);
      expect(component.percentage).toBe(0); // total is still 0
    });

    it('should update when total input changes', () => {
      const newTotal = 200;
      
      component.total = newTotal;
      fixture.detectChanges();
      
      expect(component.total).toBe(newTotal);
      expect(component.percentage).toBe(0); // current is still 0
    });

    it('should recalculate percentage when both inputs change', () => {
      component.current = 40;
      component.total = 80;
      fixture.detectChanges();
      
      expect(component.percentage).toBe(50);
    });
  });

  describe('Component Lifecycle', () => {
    it('should maintain correct state after multiple updates', () => {
      // First update
      component.current = 20;
      component.total = 100;
      expect(component.percentage).toBe(20);
      
      // Second update
      component.current = 40;
      expect(component.percentage).toBe(40);
      
      // Third update
      component.total = 200;
      expect(component.percentage).toBe(20);
      
      // Final update
      component.current = 100;
      expect(component.percentage).toBe(50);
    });
  });
});