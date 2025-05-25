import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { Router } from '@angular/router';
import { TabsComponent } from '../../shared-components/tabs/tabs.component';
@Component({
  selector: 'app-track-jd',
  imports: [CommonLayoutComponent,RouterOutlet,TabsModule,TabsComponent, CardsComponent],
  templateUrl: './my-jd.component.html',
  styleUrl: './my-jd.component.scss'
})
export class MyJdComponent {
rla3: any;
tabPanel: any;
rla1: any;
rla2: any;
 tabs: { title: string; value: number; route: string }[] = [];
  selectedTabIndex = 0;

    ngOnInit() {
        this.tabs = [
  { title: 'Pending JD Generation', value: 0, route: 'pendingjdgeneration' },
  { title: 'Tracks JDs', value: 1, route: 'trackjd' },
];

    }
}
