import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-button-icon',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  @Input() label: string = '';
  @Input() icon: string = '';
  @Input() color: string = '#7b5cfa'; // optional default

}
