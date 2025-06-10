import { Component } from '@angular/core';
import { StatCardComponent } from '../../shared-components/stat-card/stat-card.component';
import { ListViewComponent } from '../../shared-components/list-view/list-view.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import {  OnInit } from '@angular/core';
import { JrApiService, JobRequisitionSummaryDto } from '../../core/services/api/jr-api.service'; // Adjust import path
interface JobUIModel {
  title: string;
  date: string;      // formatted date string
  location: string;
  positions: number;
  id:number;
}

@Component({
  selector: 'app-assign-jr',
  imports: [FormsModule, SelectModule, StatCardComponent, ListViewComponent, HeaderTextComponent, ChartModule],
  templateUrl: './assign-jr.component.html',
  styleUrl: './assign-jr.component.scss'
})
export class AssignJrComponent implements OnInit {
  selectedView = 'asc';
  viewOptions = [
    { name: 'Date Ascending', code: 'asc' },
    { name: 'Date Descending', code: 'desc' }
  ];


  growthData = {
    value: '+61%',
    description: 'Increase in the number of successful hires this month'
  };

jobs: JobUIModel[] = [];

  barChartData: any;
  barChartOptions: any;

  constructor(private jrApi: JrApiService) {}

  ngOnInit() {
    this.loadJobSummaries();

    this.barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        { label: 'Recruiter Screening', backgroundColor: '#9068FF', data: [12, 22, 8, 20, 14] },
        { label: 'Hiring Manager Screening', backgroundColor: '#FF902B', data: [7, 16, 6, 13, 7] }
      ]
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom' } },
      scales: {
        y: {
          beginAtZero: true,
          max: 30,
          ticks: { stepSize: 2 },
          title: { display: true, text: 'Candidates' }
        }
      }
    };
  }

  loadJobSummaries() {
  this.jrApi.getOpenJobSummaries().subscribe({
    next: (response) => {
      this.jobs = response.data.map(j => ({
        id: j.id,
        title: j.title,
        date: j.postedDate
          ? new Date(j.postedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : '',
        location: j.location ?? '',
        positions: j.openPositions ?? 0
      }));
      this.sortJobs();
    },
    error: (err) => {
      console.error('Error loading job summaries', err);
    }
  });
}



 sortJobs() {
  this.jobs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return this.selectedView === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
  });
}

}