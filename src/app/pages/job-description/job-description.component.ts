import { Component } from '@angular/core';
import { TabsComponent } from '../../shared-components/tabs/tabs.component';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { RouterOutlet } from '@angular/router';
import { CardsComponent } from '../../ui/cards/cards.component';

@Component({
  selector: 'app-job-description',
  imports: [TabsComponent,CommonLayoutComponent,RouterOutlet,CardsComponent],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent {
 tabs: { title: string; value: number; route: string }[] = [];
  selectedTabIndex = 0;

    ngOnInit() {
        this.tabs = [
  { title: 'Job Description', value: 0, route: 'details' },
  { title: 'Applicants', value: 1, route: 'applicants' },
];

    }
}
