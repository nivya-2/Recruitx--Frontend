import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';

@Component({
  selector: 'app-common-layout',
  imports: [HeaderComponent,SidenavbarComponent],
  templateUrl: './common-layout.component.html',
  styleUrl: './common-layout.component.scss'
})
export class CommonLayoutComponent {
  recruitersIcons=[
    {iconName:'dashboard',size:"28px",iconColour:"#B8AAFF",label:"Dashboard",route:"/recruiter/dashboard"},
    {iconName:' bar_chart',size:"28px",iconColour:"#B8AAFF",label:"Analytics",route:"/recruiter/analytics"},
    {iconName:'timeline',size:"28px",iconColour:"#B8AAFF",label:"Track JD",route:"/recruiter/track-jd"},
    {iconName:'date_range',size:"28px",iconColour:"#B8AAFF",label:"Schedule",route:"/recruiter/schedule-interviews"}
  ]

}
