import { Component } from '@angular/core';
import { AnalyticsComponent } from '../analytics/analytics.component';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';

@Component({
  selector: 'app-recruiter-analytics',
  imports: [AnalyticsComponent,CommonLayoutComponent],
  templateUrl: './recruiter-analytics.component.html',
  styleUrl: './recruiter-analytics.component.scss'
})
export class RecruiterAnalyticsComponent {

}
