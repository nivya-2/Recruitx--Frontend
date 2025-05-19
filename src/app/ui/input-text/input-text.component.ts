import { Component, Input } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  imports: [FormsModule],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = true;

  onValueChange(event: any) {
    this.value = event.target.value;
  }

}
