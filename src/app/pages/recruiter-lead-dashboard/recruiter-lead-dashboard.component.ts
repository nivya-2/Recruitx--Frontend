import { Component } from '@angular/core';
import { CommonLayoutComponent } from "../../layouts/common-layout/common-layout.component";
import { CardsComponent } from '../../ui/cards/cards.component';

@Component({
  selector: 'app-recruiter-lead-dashboard',
  imports: [CommonLayoutComponent, CardsComponent],
  templateUrl: './recruiter-lead-dashboard.component.html',
  styleUrl: './recruiter-lead-dashboard.component.scss'
})
export class RecruiterLeadDashboardComponent {

}
