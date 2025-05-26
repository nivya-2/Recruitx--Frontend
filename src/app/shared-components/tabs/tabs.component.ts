import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-tabs',
  imports: [TabsModule,RouterLink],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
 @Input()  tabs: { title: string; value: number; route: string }[] = [];
  @Input() selectedTabIndex = 0;

  constructor(private router: Router) {}

  onTabChange(event: any) {
    const selectedTab = this.tabs[event.index];
    if (selectedTab) {
      this.router.navigate([selectedTab.route]);
    }
  }
}
