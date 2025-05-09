import { NgClass } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-header-text',
  imports: [NgClass],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss'
})
export class HeaderTextComponent {
  @Input() context: 'title' | 'subtitle' | 'heading' | 'profile-text' | 'table-header' = 'title';

  get className(): string {
    return ['title', 'subtitle', 'profile-text', 'table-header'].includes(this.context)
      ? this.context
      : 'title';
  }
}
