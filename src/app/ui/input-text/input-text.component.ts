import { NgIf, NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
// import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-input-text',
  imports: [FormsModule, NgStyle, NgIf],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
   providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true
    }
  ]
})

export class InputTextComponent implements ControlValueAccessor{

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  @Input() label: string = '';
  // @Input() value: string = '';
  @Input() disabled: boolean = true;
  @Input() fontWeight: string = 'normal';
  @Input() placeHolder: string = '';
  @Input() isTextarea: boolean = false; // Add this to support <textarea>
  // @Output() valueChange = new EventEmitter<string>();

  value: string = '';
    onChange: (value: string) => void = () => {};
      onTouched: () => void = () => {};

    

  onValueChange(event: any) {
     const newValue = event.target.value;
    this.value = newValue;
    // Inform Angular that the value has changed
    this.onChange(newValue);;
  }
}
