import { Component, Input } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IconComponent } from '../../ui/icon/icon.component';

@Component({
  selector: 'app-icon-group',
  standalone: true, // ✅ This makes the component standalone
  imports: [CommonModule, IconComponent, NgFor], // ✅ Correct modules/components only
  templateUrl: './icon-group.component.html',
  styleUrls: ['./icon-group.component.scss'] // ✅ fixed typo from styleUrl -> styleUrls
})
export class IconGroupComponent {
  @Input() iconList: any[] = [];
}
