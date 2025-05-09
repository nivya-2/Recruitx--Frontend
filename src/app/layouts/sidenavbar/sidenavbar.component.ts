import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

import { NgFor } from '@angular/common';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-sidenavbar',
  imports: [ButtonModule,NgFor ,DrawerModule,CardModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss'
})
export class SidenavbarComponent {
  visible: boolean = false;
  icons = [
    ['pi pi-arrow-right','Dashboard'],
    ['pi pi-arrow-left','Analytics'],
    ['pi pi-plus','Track'],
    ['pi pi-minus','Schedule'],
];
}
