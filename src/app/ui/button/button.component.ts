import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule, NgStyle],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Output() functionemit = new EventEmitter();

  @Input() color: string = '#7B61FF';
  @Input() action: () => void = () => { };

  handleClick() {
    // if (this.action) {
    //   const result = this.action();
      this.functionemit.emit();
    // }
  }

}
