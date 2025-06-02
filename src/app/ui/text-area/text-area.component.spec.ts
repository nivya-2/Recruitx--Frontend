import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextAreaComponent, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component Initialization', () => {
    it('should initialize with default values', () => {
      expect(component.label).toBe('');
      expect(component.value).toBe('');
      expect(component.disabled).toBe(true);
    });
  });

  describe('Input Properties', () => {
    it('should accept label input', () => {
      const testLabel = 'Test Label';
      component.label = testLabel;
      fixture.detectChanges();
      
      expect(component.label).toBe(testLabel);
    });

    it('should accept value input', () => {
      const testValue = 'Test Value';
      component.value = testValue;
      fixture.detectChanges();
      
      expect(component.value).toBe(testValue);
    });

    it('should accept disabled input', () => {
      component.disabled = false;
      fixture.detectChanges();
      
      expect(component.disabled).toBe(false);
    });
  });

  describe('onValueChange Method', () => {
    it('should update value when onValueChange is called', () => {
      const mockEvent = {
        target: {
          value: 'New test value'
        }
      };

      component.onValueChange(mockEvent);
      
      expect(component.value).toBe('New test value');
    });

    it('should handle empty string value', () => {
      const mockEvent = {
        target: {
          value: ''
        }
      };

      component.onValueChange(mockEvent);
      
      expect(component.value).toBe('');
    });

    it('should handle multiple value changes', () => {
      const firstEvent = { target: { value: 'First value' } };
      const secondEvent = { target: { value: 'Second value' } };

      component.onValueChange(firstEvent);
      expect(component.value).toBe('First value');

      component.onValueChange(secondEvent);
      expect(component.value).toBe('Second value');
    });
  });

  describe('Template Integration Tests', () => {
    // Note: These tests assume basic template structure. 
    // Adjust selectors based on your actual template implementation.
    
    it('should render component template correctly', () => {
      component.label = 'Test Label';
      component.value = 'Test Value';
      component.disabled = false;
      fixture.detectChanges();
      
      // Test that component renders without errors
      expect(fixture.debugElement.nativeElement).toBeTruthy();
    });

    it('should update component when input properties change', () => {
      // Test property binding updates
      component.label = 'Updated Label';
      component.value = 'Updated Value';
      component.disabled = false;
      
      fixture.detectChanges();
      
      expect(component.label).toBe('Updated Label');
      expect(component.value).toBe('Updated Value');
      expect(component.disabled).toBe(false);
    });

    it('should handle template rendering with different property combinations', () => {
      // Test with empty values
      component.label = '';
      component.value = '';
      component.disabled = true;
      fixture.detectChanges();
      
      expect(component.label).toBe('');
      expect(component.value).toBe('');
      expect(component.disabled).toBe(true);
      
      // Test with populated values
      component.label = 'New Label';
      component.value = 'New Value';
      component.disabled = false;
      fixture.detectChanges();
      
      expect(component.label).toBe('New Label');
      expect(component.value).toBe('New Value');
      expect(component.disabled).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle null/undefined event target', () => {
      const mockEvent = { target: null };
      
      expect(() => component.onValueChange(mockEvent)).toThrow();
    });

    it('should handle event without target property', () => {
      const mockEvent = {};
      
      expect(() => component.onValueChange(mockEvent as any)).toThrow();
    });
  });

  describe('Component State Changes', () => {
    it('should reflect property changes in component state', () => {
      // Test initial state
      expect(component.label).toBe('');
      expect(component.value).toBe('');
      expect(component.disabled).toBe(true);

      // Change properties
      component.label = 'Updated Label';
      component.value = 'Updated Value';
      component.disabled = false;

      // Verify changes
      expect(component.label).toBe('Updated Label');
      expect(component.value).toBe('Updated Value');
      expect(component.disabled).toBe(false);
    });
  });
});