import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardModule } from 'primeng/card';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { KnobModule } from 'primeng/knob';
import { ButtonComponent } from '../../ui/button/button.component';
import { ListViewComponent } from '../../shared-components/list-view/list-view.component';
import { StatCardComponent } from '../../shared-components/stat-card/stat-card.component';
import { TabsComponent } from '../../shared-components/tabs/tabs.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-recruiter-head-dashboard',
  imports: [RouterOutlet,CardsComponent,TabsComponent,ChartModule,CommonLayoutComponent,CardModule,KnobModule],
  templateUrl: './track-jr.component.html',
  styleUrl: './track-jr.component.scss'
})
export class RecruiterHeadTrackJrComponent {
  
   tabs: { title: string; value: number; route: string }[] = [];
  selectedTabIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.tabs = [
  { title: 'Assign JR', value: 0, route: 'assign-jr' },
  { title: 'Track JR', value: 1, route: 'track-jr' },
];
const currentRoute = this.router.url.split('/').pop();

    const foundTab = this.tabs.find(tab => tab.route === currentRoute);
    if (foundTab) {
      this.selectedTabIndex = foundTab.value;
    }
    }
}
