import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {

  //can style 3 properties in icon
  @Input() name: string = 'home';
  @Input() size: string = '24px';
  @Input() customColor: string = 'red';



  //function for styling icons
  getIconStyles() {
    const sizeValue = this.size.replace('px', '');
    const numericSize = parseInt(sizeValue) || 24;
    return {
      'font-size': this.size,
      'width': this.size,
      'height': this.size,
      'color': this.customColor || null,
      'display': 'inline-block',
      'line-height': this.size,
      'text-align': 'center',
      'transform': `scale(${numericSize / 24})`,
      'transform-origin': 'center'
    };
  }
}
