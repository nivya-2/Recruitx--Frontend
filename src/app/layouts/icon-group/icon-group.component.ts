import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IconComponent } from '../../ui/icon/icon.component';

@Component({
  selector: 'app-icon-group',
  standalone: true,
  imports: [CommonModule,IconComponent, NgFor], 
  templateUrl: './icon-group.component.html',
  styleUrls: ['./icon-group.component.scss']
})
export class IconGroupComponent {
  @Input() iconList: any[] = [];
  @Input() showLabel: boolean = true;
  @Input() visible: boolean = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  onClick(iconName: string) {
    this.toggleSidebar.emit(!this.visible);
  }
  hoveredIconIndex: number | null = null;


}
