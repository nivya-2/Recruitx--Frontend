import { Component, OnInit } from '@angular/core';
import { TabsComponent } from '../../shared-components/tabs/tabs.component';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { RouterOutlet } from '@angular/router';
import { CardsComponent } from "../../ui/cards/cards.component";
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-description',
  imports: [TabsComponent, CommonLayoutComponent, RouterOutlet, CardsComponent],
  templateUrl: './job-description.component.html',
  styleUrl: './job-description.component.scss'
})
export class JobDescriptionComponent implements OnInit{
  constructor(private router: Router) {}
 tabs: { title: string; value: number; route: string }[] = [];
  selectedTabIndex = 0;

    ngOnInit() {
     const segments = this.router.url.split('/');
  const id = segments[segments.length - 1]; // Assumes ID is last part

  this.tabs = [
    { title: 'Job Description', value: 0, route: `details/${id}` },
    { title: 'Applicants', value: 1, route: `applicants/${id}` },
  ];

  const currentRoute = segments[segments.length - 2]; // e.g., 'details' or 'applicants'

    const foundTab = this.tabs.find(tab => tab.route === currentRoute);
    if (foundTab) {
      this.selectedTabIndex = foundTab.value;
    }

    }
}
