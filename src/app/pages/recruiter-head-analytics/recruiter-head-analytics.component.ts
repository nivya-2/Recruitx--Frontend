import { Component } from '@angular/core';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';

@Component({
  selector: 'app-recruiter-head-analytics',
  imports: [AnalyticsComponent,CommonLayoutComponent],
  templateUrl: './recruiter-head-analytics.component.html',
  styleUrl: './recruiter-head-analytics.component.scss'
})
export class RecruiterHeadAnalyticsComponent {

}
