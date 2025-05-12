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
    {iconName:'dashboard',size:"32px",iconColour:"#B8AAFF",label:"Dasboard"},
    {iconName:' bar_chart',size:"32px",iconColour:"#B8AAFF",label:"Anaytics"},
    {iconName:'timeline',size:"32px",iconColour:"#B8AAFF",label:"Track JD"},
    {iconName:'date_range',size:"32px",iconColour:"#B8AAFF",label:"Schedule"}
  ]

}
