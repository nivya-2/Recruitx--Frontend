import { NgClass, NgStyle } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-header-text',
  imports: [NgClass,NgStyle],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss'
})
export class HeaderTextComponent {
  @Input() context: 'title' | 'subtitle' | 'heading' | 'profile-text' | 'table-header' = 'title';
  @Input() nopad: boolean = false;
  get className(): string {
    return ['title', 'subtitle', 'profile-text', 'table-header'].includes(this.context)
      ? this.context
      : 'title';
  }

}
