import { Component } from '@angular/core';
import { CommonLayoutComponent } from '../../layouts/common-layout/common-layout.component';
import { CardsComponent } from '../../ui/cards/cards.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-track-jd',
  imports: [CommonLayoutComponent, CardsComponent,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './track-jd.component.html',
  styleUrl: './track-jd.component.scss'
})
export class TrackJdComponent {
rla3: any;
tabPanel: any;
rla1: any;
rla2: any;

}
