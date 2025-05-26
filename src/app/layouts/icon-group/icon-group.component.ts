import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IconComponent } from '../../ui/icon/icon.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon-group',
  imports: [CommonModule,IconComponent, NgFor], 
  templateUrl: './icon-group.component.html',
  styleUrl: './icon-group.component.scss'
})
export class IconGroupComponent implements OnInit {
  @Input() iconList: any[] = [];
  @Input() showLabel: boolean = true;
  @Input() visible: boolean = false;
  @Output() toggleSidebar = new EventEmitter<boolean>();

  hoveredIconIndex: number | null = null;
  activeIconIndex: number | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const currentUrl = this.router.url;
    const index = this.iconList.findIndex(icon => currentUrl.startsWith(icon.route));
    if (index !== -1) {
      this.activeIconIndex = index;
    }
  }

  onClick(icon: any): void {
    const index = this.iconList.indexOf(icon);
    if (index !== -1) {
      this.setActiveIcon(index);
    }
    if (icon.route) {
      this.router.navigate([icon.route]);
    }
  }

  setActiveIcon(index: number): void {
    this.activeIconIndex = index;
  }
}