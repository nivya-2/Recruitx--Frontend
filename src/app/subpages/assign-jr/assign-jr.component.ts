import { Component } from '@angular/core';
import { StatCardComponent } from '../../shared-components/stat-card/stat-card.component';
import { ListViewComponent } from '../../shared-components/list-view/list-view.component';
import { HeaderTextComponent } from '../../ui/header-text/header-text.component';
import { ChartModule } from 'primeng/chart';

interface MetricCard {
  title: string;
  value: string | number;
  percentage?: number;
  color?: string;
}
@Component({
  selector: 'app-assign-jr',
  imports: [StatCardComponent,ListViewComponent,HeaderTextComponent,ChartModule],
  templateUrl: './assign-jr.component.html',
  styleUrl: './assign-jr.component.scss'
})

export class AssignJrComponent {
metricsData: MetricCard[] = [
    {
      title: 'Total Applications',
      value: 1531
    },
    {
      title: 'Total Shortlisted',
      value: 1148,
      percentage: 75,
      color: '#3EB489'
    },
    {
      title: 'Total Job Offered',
      value: 574,
      percentage: 50,
      color: '#4B6BDC'
    },
    {
      title: 'Total Candidates Hired',
      value: 86,
      percentage: 15,
      color: '#F05252'
    }
  ];
  growthData = {
    value: '+61%',
    description: 'Increase in the number of successful hires this month'
  };
  jobs = [
    { title: 'Sr. Data Engineer - Python', date: 'April 25, 2025', location: 'Kochi', positions: 16 },
    { title: 'Devops Architect', date: 'April 12, 2025', location: 'Trivandrum', positions: 8 },
    { title: 'Automation Test Engineer', date: 'April 9, 2025', location: 'Trivandrum', positions: 4 },
    { title: 'Data Scientist - Computer Vision', date: 'April 2, 2025', location: 'Kochi', positions: 9 },
    { title: 'Technology Lead - .Net', date: 'April 19, 2025', location: 'Trivandrum', positions: 6 }
  ];
barChartData: any;
    barChartOptions: any;
  
    ngOnInit() {
      this.barChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Recruiter Screening',
            backgroundColor: '#9068FF',
            data: [12, 22, 8, 20, 14]
          },
          {
            label: 'Hiring Manager Screening',
            backgroundColor: '#FF902B',
            data: [7, 16, 6, 13, 7]
          }
        ]
      };
      
      this.barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 30,
            ticks: {
              stepSize: 2
            },
            title: {
              display: true,
              text: 'Candidates'
            }
          },
          
        }
      };
    }
}
