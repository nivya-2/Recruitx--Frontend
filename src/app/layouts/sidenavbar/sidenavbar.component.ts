import { Component, Input } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

import { NgClass, NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IconGroupComponent } from '../icon-group/icon-group.component';
import { IconComponent } from '../../ui/icon/icon.component';
@Component({
  selector: 'app-sidenavbar',
  imports: [ButtonModule,IconGroupComponent,IconComponent
,    NgFor,NgClass ,DrawerModule,CardModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss'
})
export class SidenavbarComponent {
  visible: boolean = false;
  @Input() iconList: any[] = [];
}
