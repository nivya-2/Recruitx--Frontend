import { Component } from '@angular/core';
import { StatCardComponent } from '../../shared-components/stat-card/stat-card.component';
import { ListViewComponent } from '../../shared-components/list-view/list-view.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
interface MetricCard {
  title: string;
  value: string | number;
  percentage?: number;
  color?: string;
}
@Component({
  selector: 'app-assign-jr',
  imports: [FormsModule,SelectModule,StatCardComponent,ListViewComponent,HeaderTextComponent,ChartModule],
  templateUrl: './assign-jr.component.html',
  styleUrl: './assign-jr.component.scss'
})

export class AssignJrComponent {
  selectedView = 'asc'; // or 'desc' by default

viewOptions = [
  { name: 'Date Ascending', code: 'asc' },
  { name: 'Date Descending', code: 'desc' }
];

  jobs = [
    { title: 'Sr. Data Engineer - Python', date: 'April 25, 2025', location: 'Kochi', positions: 16 },
    { title: 'Devops Architect', date: 'April 12, 2025', location: 'Trivandrum', positions: 8 },
    { title: 'Automation Test Engineer', date: 'April 9, 2025', location: 'Trivandrum', positions: 4 },
    { title: 'Data Scientist - Computer Vision', date: 'April 2, 2025', location: 'Kochi', positions: 9 },
    { title: 'Technology Lead - .Net', date: 'April 19, 2025', location: 'Trivandrum', positions: 6 }
  ];

    sortJobs() {
  this.jobs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    return this.selectedView === 'asc' 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });
}
}
