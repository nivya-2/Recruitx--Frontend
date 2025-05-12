import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';

@Component({
  selector: 'app-track-jd',
  imports: [CommonLayoutComponent, CardsComponent],
  templateUrl: './track-jd.component.html',
  styleUrl: './track-jd.component.scss'
})
export class TrackJdComponent {

}
