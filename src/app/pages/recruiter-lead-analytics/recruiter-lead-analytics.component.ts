import { Component } from '@angular/core';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';

@Component({
  selector: 'app-recruiter-lead-analytics',
  imports: [AnalyticsComponent,CommonLayoutComponent],
  templateUrl: './recruiter-lead-analytics.component.html',
  styleUrl: './recruiter-lead-analytics.component.scss'
})
export class RecruiterLeadAnalyticsComponent {

}
