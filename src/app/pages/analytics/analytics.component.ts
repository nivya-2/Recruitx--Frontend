import { Component } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { CommonLayoutComponent } from "../../layouts/common-layout/common-layout.component";
import { ChartModule } from 'primeng/chart';


@Component({
  selector: 'app-analytics',
  imports: [CardsComponent, CommonLayoutComponent, ChartModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

  sourceChartData = {
    labels: ['LinkedIn', 'Referral', 'Job Portal', 'Career Page'],
    datasets: [
      {
        label: 'Joins',
        data: [45, 30, 20, 15],
        backgroundColor: '#42A5F5'
      }
    ]
  };

  sourceChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Top Performing Sources'
      }
    }
  };

  joinDeclineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Joined',
        data: [20, 25, 22, 30, 28],
        borderColor: '#4CAF50',
        fill: false
      },
      {
        label: 'Declined',
        data: [5, 8, 4, 10, 6],
        borderColor: '#EF5350',
        fill: false
      }
    ]
  };

  joinDeclineOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Joining vs Declined Trend'
      }
    }
  };

  interviewStatusData = {
  labels: ['Scheduled', 'Completed', 'Selected', 'Rejected'],
  datasets: [
    {
      data: [25, 18, 10, 12],
      backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#EF5350']
    }
  ]
};

interviewStatusOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right'
    },
    title: {
      display: true,
      text: 'Interview Status Breakdown'
    }
  }
};


}
