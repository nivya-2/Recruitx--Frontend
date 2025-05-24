import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  imports: [FormsModule],
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss'
})
export class TextAreaComponent {

  @Input() label: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = true;

  onValueChange(event: any) {
    this.value = event.target.value;
  }

}
