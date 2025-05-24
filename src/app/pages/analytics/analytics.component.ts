import { Component } from '@angular/core';
import { CardsComponent } from "../../ui/cards/cards.component";
import { CommonLayoutComponent } from "../../layouts/common-layout/common-layout.component";

@Component({
  selector: 'app-analytics',
  imports: [CardsComponent, CommonLayoutComponent],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent {

}
