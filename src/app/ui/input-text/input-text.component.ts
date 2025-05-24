import { NgStyle } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  imports: [FormsModule, NgStyle],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = true;
  @Input() fontWeight: string = 'normal';
  @Input() placeHolder: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(event: any) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }
}
